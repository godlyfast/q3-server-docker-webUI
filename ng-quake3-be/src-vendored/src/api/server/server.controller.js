'use strict';

import fs from 'fs';
import Q3RCon from 'quake3-rcon';

const MODE_FILE = '/shared/server-mode';
const VALID_MODES = ['baseq3', 'cpma', 'excessiveplus', 'osp'];
const DEFAULT_MODE = 'baseq3';

const rcon = new Q3RCon({
  address: process.env.Q3SERV_HOST || '192.168.120.4',
  port: process.env.Q3SERV_PORT || 27960,
  password: process.env.Q3SERV_PASS || 'uniquake3',
});

export function getMode(req, res) {
  let mode = DEFAULT_MODE;
  try {
    if (fs.existsSync(MODE_FILE)) {
      mode = fs.readFileSync(MODE_FILE, 'utf8').trim();
    }
  } catch (e) {
    console.error('Failed to read server mode:', e.message);
  }
  if (!VALID_MODES.includes(mode)) {
    mode = DEFAULT_MODE;
  }
  res.json({ mode });
}

export function setMode(req, res) {
  const mode = req.body && req.body.mode;
  if (!mode || !VALID_MODES.includes(mode)) {
    return res.status(400).json({ error: `Invalid mode. Must be one of: ${VALID_MODES.join(', ')}` });
  }

  try {
    fs.writeFileSync(MODE_FILE, mode, 'utf8');
  } catch (e) {
    console.error('Failed to write server mode:', e.message);
    return res.status(500).json({ error: 'Failed to write mode file' });
  }

  // Send RCON quit to trigger server restart (Docker restart policy restarts it)
  rcon.send('quit', function () {
    // Response may not arrive since the server is dying
  });

  res.json({ mode, restarting: true });
}

function readCurrentMode() {
  try {
    if (fs.existsSync(MODE_FILE)) {
      const mode = fs.readFileSync(MODE_FILE, 'utf8').trim();
      if (VALID_MODES.includes(mode)) return mode;
    }
  } catch (e) {}
  return DEFAULT_MODE;
}

function parseServerInfo(raw) {
  // serverinfo returns backslash-delimited key-value pairs:
  // \mapname\q3dm17\g_gametype\0\instagib\1
  const vars = {};
  const parts = raw.split('\\').filter(s => s.length > 0);
  for (let i = 0; i < parts.length - 1; i += 2) {
    vars[parts[i].trim()] = parts[i + 1].trim();
  }
  return vars;
}

function rconSend(command) {
  return new Promise((resolve) => {
    rcon.send(command, (response) => {
      resolve(response || '');
    });
  });
}

export function getInstagib(req, res) {
  const mode = readCurrentMode();

  if (mode !== 'osp') {
    return res.json({ supported: false, enabled: false });
  }

  // OSP: query serverinfo via RCON
  rconSend('serverinfo').then((response) => {
    const vars = parseServerInfo(response);
    const enabled = vars['match_instagib'] === '1';
    res.json({ supported: true, enabled });
  });
}

export function setInstagib(req, res) {
  const enabled = req.body && req.body.enabled;
  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ error: 'enabled must be a boolean' });
  }

  const mode = readCurrentMode();

  if (mode !== 'osp') {
    return res.status(400).json({ error: `InstaGib toggle not supported in ${mode} mode` });
  }

  // OSP: live RCON toggle + map_restart
  rconSend(`match_instagib ${enabled ? 1 : 0}`).then(() => {
    return rconSend('map_restart');
  }).then(() => {
    res.json({ enabled, restarting: false });
  });
}
