'use strict';

import fs from 'fs';
import Q3RCon from 'quake3-rcon';

const MODE_FILE = '/shared/server-mode';
const VALID_MODES = ['baseq3', 'cpma', 'excessiveplus', 'osp'];
const DEFAULT_MODE = 'baseq3';

const OSP_TOGGLES = {
  'hook_enable':       { values: ['0', '1'] },
  'server_freezetag':  { values: ['0', '1', '2'] },
  'server_promode':    { values: ['0', '1'] },
  'match_hurtself':    { values: ['0', '1'] },
  'g_friendlyFire':    { values: ['0', '1'] },
  'server_thrufloors': { values: ['0', '1'] },
  'server_fastrail':   { values: ['0', '1'] },
  'server_lgcooldown': { values: ['0', '1'] },
  'weapon_deaddrop':   { values: ['0', '1'] },
  'match_dropitems':   { values: ['0', '1'] },
  'armor_q2style':     { values: ['0', '1'] },
};

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

function stripQ3Colors(str) {
  return str.replace(/\^[0-9]/g, '');
}

function parseServerInfo(raw) {
  // serverinfo returns backslash-delimited key-value pairs:
  // \mapname\q3dm17\g_gametype\0\instagib\1
  // OSP appends ^7 (color reset) to values, so strip Q3 color codes
  const vars = {};
  const parts = raw.split('\\').filter(s => s.length > 0);
  for (let i = 0; i < parts.length - 1; i += 2) {
    vars[stripQ3Colors(parts[i].trim())] = stripQ3Colors(parts[i + 1].trim());
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

function parseCvarResponse(raw) {
  // RCON cvar query returns: "cvarname" is:"value" default:"default"
  const match = raw.match(/is:"([^"]*)"/);
  return match ? stripQ3Colors(match[1]) : null;
}

export function getSettings(req, res) {
  const mode = readCurrentMode();

  if (mode !== 'osp') {
    return res.json({ supported: false, settings: {} });
  }

  rconSend('serverinfo').then(async (response) => {
    const vars = parseServerInfo(response);
    const settings = {};

    // Extract toggle cvars — try serverinfo first, fall back to individual query
    for (const cvar of Object.keys(OSP_TOGGLES)) {
      if (vars[cvar] !== undefined) {
        settings[cvar] = vars[cvar];
      } else {
        const raw = await rconSend(cvar);
        const val = parseCvarResponse(raw);
        settings[cvar] = val !== null ? val : '0';
      }
    }

    // Decompose dmflags bitmask
    const dmflags = parseInt(vars['dmflags'] || '0', 10) || 0;
    settings['dmflags_noFallingDamage'] = (dmflags & 8) ? '1' : '0';
    settings['dmflags_noFootsteps'] = (dmflags & 32) ? '1' : '0';

    res.json({ supported: true, settings });
  });
}

export function setSetting(req, res) {
  const { cvar, value } = req.body || {};

  if (!cvar || value === undefined) {
    return res.status(400).json({ error: 'cvar and value are required' });
  }

  const mode = readCurrentMode();
  if (mode !== 'osp') {
    return res.status(400).json({ error: `Settings toggle not supported in ${mode} mode` });
  }

  // Handle dmflags pseudo-cvars
  if (cvar === 'dmflags_noFallingDamage' || cvar === 'dmflags_noFootsteps') {
    if (value !== '0' && value !== '1') {
      return res.status(400).json({ error: 'value must be 0 or 1' });
    }
    const bit = cvar === 'dmflags_noFallingDamage' ? 8 : 32;

    rconSend('serverinfo').then((response) => {
      const vars = parseServerInfo(response);
      let dmflags = parseInt(vars['dmflags'] || '0', 10) || 0;
      if (value === '1') {
        dmflags |= bit;
      } else {
        dmflags &= ~bit;
      }
      return rconSend(`dmflags ${dmflags}`);
    }).then(() => {
      return rconSend('map_restart');
    }).then(() => {
      res.json({ cvar, value });
    });
    return;
  }

  // Validate against whitelist
  const toggle = OSP_TOGGLES[cvar];
  if (!toggle) {
    return res.status(400).json({ error: `Unknown cvar: ${cvar}` });
  }
  if (!toggle.values.includes(value)) {
    return res.status(400).json({ error: `Invalid value for ${cvar}. Must be one of: ${toggle.values.join(', ')}` });
  }

  rconSend(`${cvar} ${value}`).then(() => {
    return rconSend('map_restart');
  }).then(() => {
    res.json({ cvar, value });
  });
}
