import { Component, OnInit } from '@angular/core';
import {RconService} from '../../services/rcon.service';
import {RconStatus} from '../../interfaces/status.rcon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rconData: RconStatus;
  serverMode: string = '';
  modeLoading: boolean = false;

  modes = [
    { value: 'baseq3', label: 'Vanilla Q3' },
    { value: 'cpma', label: 'CPMA' },
    { value: 'excessiveplus', label: 'Excessive+' },
    { value: 'osp', label: 'OSP' },
  ];

  gametypesByMode: {[mode: string]: {value: number, label: string, desc: string}[]} = {
    baseq3: [
      { value: 0, label: 'FFA', desc: 'Free For All' },
      { value: 1, label: 'Duel', desc: '1v1 Tournament' },
      { value: 3, label: 'TDM', desc: 'Team Deathmatch' },
      { value: 4, label: 'CTF', desc: 'Capture The Flag' },
    ],
    osp: [
      { value: 0, label: 'FFA', desc: 'Free For All' },
      { value: 1, label: 'Duel', desc: '1v1 Tournament' },
      { value: 3, label: 'TDM', desc: 'Team Deathmatch' },
      { value: 4, label: 'CTF', desc: 'Capture The Flag' },
      { value: 5, label: 'CA', desc: 'Clan Arena — round-based, all weapons, no self-damage' },
    ],
    cpma: [
      { value: 0, label: 'FFA', desc: 'Free For All' },
      { value: 1, label: 'Duel', desc: '1v1 Tournament' },
      { value: 3, label: 'TDM', desc: 'Team Deathmatch' },
      { value: 4, label: 'CTF', desc: 'Capture The Flag' },
      { value: 5, label: 'CA', desc: 'Clan Arena — round-based, no self-damage' },
    ],
    excessiveplus: [
      { value: 0, label: 'FFA', desc: 'Free For All' },
      { value: 1, label: 'Duel', desc: '1v1 Tournament' },
      { value: 3, label: 'TDM', desc: 'Team Deathmatch' },
      { value: 4, label: 'CTF', desc: 'Capture The Flag' },
      { value: 8, label: 'FreezeTag', desc: 'Freeze enemies, thaw teammates' },
    ],
  };
  currentGametype: number = -1;

  instagibEnabled: boolean = false;
  instagibSupported: boolean = false;
  instagibLoading: boolean = false;

  ospSettingsSupported: boolean = false;
  ospSettings: {[key: string]: string} = {};
  ospSettingUpdating: string = '';

  ospToggles = [
    { cvar: 'hook_enable',             label: 'Grappling Hook',       type: 'bool' },
    { cvar: 'server_freezetag',        label: 'FreezeTag',            type: 'multi',
      options: [{v:'0',l:'Off'},{v:'1',l:'OSP'},{v:'2',l:'Vanilla'}],
      note: 'Requires TDM gametype' },
    { cvar: 'server_promode',          label: 'ProMode Physics',      type: 'bool' },
    { cvar: 'match_hurtself',          label: 'Self Damage',          type: 'bool' },
    { cvar: 'g_friendlyFire',          label: 'Friendly Fire',        type: 'bool' },
    { cvar: 'server_thrufloors',       label: 'Splash Through Walls', type: 'bool' },
    { cvar: 'server_fastrail',         label: 'Fast Rail Switch',     type: 'bool', note: 'ProMode' },
    { cvar: 'server_lgcooldown',       label: 'LG Cooldown',          type: 'bool', note: 'ProMode' },
    { cvar: 'weapon_deaddrop',         label: 'Drop Weapon on Death', type: 'bool' },
    { cvar: 'match_dropitems',         label: 'Allow Item Drop',      type: 'bool', note: 'TDM' },
    { cvar: 'armor_q2style',           label: 'Q2-Style Armor',       type: 'bool' },
    { cvar: 'dmflags_noFallingDamage', label: 'No Falling Damage',    type: 'bool' },
    { cvar: 'dmflags_noFootsteps',     label: 'No Footsteps',         type: 'bool' },
  ];

  eplusToggles = [
    { cvar: 'xp_config',                 label: 'Config Preset',        type: 'multi',
      options: [
        {v:'conf/default.cfg',    l:'Default'},
        {v:'conf/baseq3.cfg',     l:'Vanilla'},
        {v:'conf/excessive1.cfg', l:'Excessive 1'},
        {v:'conf/excessive2.cfg', l:'Excessive 2'},
        {v:'conf/excessive3.cfg', l:'Excessive 3'},
        {v:'conf/excessive4.cfg', l:'Excessive 4'},
        {v:'conf/excessive5.cfg', l:'Excessive 5'},
      ],
      note: 'Changes weapons, health, physics' },
    { cvar: 'xp_unlagged',               label: 'Unlagged',             type: 'bool', note: 'Lag compensation' },
    { cvar: 'xp_suddenDeath',            label: 'Sudden Death',         type: 'bool' },
    { cvar: 'xp_teamBalance',            label: 'Team Balance',         type: 'bool' },
    { cvar: 'xp_muteSpectators',         label: 'Mute Spectators',      type: 'bool' },
    { cvar: 'xp_holyshit',               label: 'BFG Direct Hit Sound', type: 'bool' },
    { cvar: 'xp_crazyCTF',               label: 'Crazy CTF',            type: 'bool', note: 'Flag respawn mod' },
    { cvar: 'xp_noCustomEnts',           label: 'No Custom Entities',   type: 'bool', note: 'Disable map scripts' },
    { cvar: 'g_friendlyFire',            label: 'Friendly Fire',        type: 'bool' },
    { cvar: 'xp_matchmode',              label: 'Match Mode',           type: 'multi',
      options: [{v:'0',l:'Off'},{v:'1',l:'Simple'},{v:'2',l:'Rounds'},{v:'3',l:'Round-Based'}] },
    { cvar: 'xp_physics_forwardAirCtrl', label: 'Forward Air Control',  type: 'bool' },
    { cvar: 'xp_physics_sidewardAirCtrl',label: 'Sideward Air Control', type: 'bool' },
    { cvar: 'xp_physics_airStopping',    label: 'Air Stopping',         type: 'bool' },
    { cvar: 'xp_physics_noRampJumps',    label: 'Disable Ramp Jumps',   type: 'bool' },
  ];

  get activeToggles() {
    if (this.serverMode === 'osp') return this.ospToggles;
    if (this.serverMode === 'excessiveplus') return this.eplusToggles;
    return [];
  }

  get settingsTitle(): string {
    if (this.serverMode === 'osp') return 'OSP Settings';
    if (this.serverMode === 'excessiveplus') return 'E+ Settings';
    return 'Mod Settings';
  }

  get availableGametypes() {
    return this.gametypesByMode[this.serverMode] || this.gametypesByMode['baseq3'];
  }

  get currentGametypeLabel(): string {
    const gt = this.availableGametypes.find(g => g.value === this.currentGametype);
    return gt ? gt.label : `Type ${this.currentGametype}`;
  }

  constructor(private rcon: RconService) { }

  ngOnInit() {
    this.rcon.getStatus().subscribe(res => this.rconData = res);
    this.rcon.getServerMode().subscribe(res => {
      this.serverMode = res.mode;
      this.refreshInstagib();
      this.refreshOspSettings();
    });
    this.rcon.getServerInfo().subscribe(vars => {
      const gt = vars.find(v => v.name === 'g_gametype');
      if (gt) this.currentGametype = parseInt(gt.value, 10);
    });
  }

  get modeLabel(): string {
    const m = this.modes.find(m => m.value === this.serverMode);
    return m ? m.label : this.serverMode;
  }

  switchTo(mode: {value: string, label: string}) {
    if (mode.value === this.serverMode) return;
    if (!confirm(`Switch to ${mode.label}? Server will restart and all players will be disconnected.`)) return;
    this.modeLoading = true;
    this.currentGametype = -1;
    this.rcon.setServerMode(mode.value).subscribe(
      res => {
        this.serverMode = res.mode;
        this.modeLoading = false;
        this.refreshGametype();
        this.refreshInstagib();
        this.refreshOspSettings();
      },
      () => {
        this.modeLoading = false;
      }
    );
  }

  private refreshGametype() {
    setTimeout(() => {
      this.rcon.getServerInfo().subscribe(
        vars => {
          const gt = vars.find(v => v.name === 'g_gametype');
          if (gt) {
            this.currentGametype = parseInt(gt.value, 10);
          } else {
            this.refreshGametype();
          }
        },
        () => this.refreshGametype()
      );
    }, 15000);
  }

  switchGametype(gt: {value: number, label: string, desc: string}) {
    if (gt.value === this.currentGametype) return;
    if (!confirm(`Switch to ${gt.label} (${gt.desc})? Current map will restart.`)) return;
    this.rcon.sendCommand('g_gametype', gt.value.toString()).subscribe(() => {
      this.currentGametype = gt.value;
      this.rcon.sendCommand('map_restart', '').subscribe();
    });
  }

  refreshInstagib() {
    this.rcon.getInstagib().subscribe(res => {
      this.instagibSupported = res.supported;
      this.instagibEnabled = res.enabled;
    });
  }

  toggleInstagib() {
    const enable = !this.instagibEnabled;
    this.instagibLoading = true;
    this.rcon.setInstagib(enable).subscribe(res => {
      this.instagibEnabled = res.enabled;
      this.instagibLoading = false;
    });
  }

  refreshOspSettings() {
    this.rcon.getOspSettings().subscribe(res => {
      this.ospSettingsSupported = res.supported;
      this.ospSettings = res.settings;
    });
  }

  toggleOspSetting(cvar: string, value: string) {
    this.ospSettingUpdating = cvar;
    this.rcon.setOspSetting(cvar, value).subscribe(
      res => {
        this.ospSettings[res.cvar] = res.value;
        this.ospSettingUpdating = '';
      },
      () => {
        this.ospSettingUpdating = '';
      }
    );
  }

  getSettingValue(cvar: string): string {
    const val = this.ospSettings[cvar];
    return val !== undefined ? val : '0';
  }
}
