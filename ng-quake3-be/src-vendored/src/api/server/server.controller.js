'use strict';

import fs from 'fs';
import Q3RCon from 'quake3-rcon';

const MODE_FILE = '/shared/server-mode';
const VALID_MODES = ['baseq3', 'cpma', 'excessiveplus'];
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
