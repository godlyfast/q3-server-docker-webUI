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
    { value: 'generations', label: 'GenArena' },
    { value: 'ufreeze', label: 'UFreeze' },
    { value: 'pkarena', label: 'PainKeep' },
  ];

  constructor(private rcon: RconService) { }

  ngOnInit() {
    this.rcon.getStatus().subscribe(res => this.rconData = res);
    this.rcon.getServerMode().subscribe(res => this.serverMode = res.mode);
  }

  get modeLabel(): string {
    const m = this.modes.find(m => m.value === this.serverMode);
    return m ? m.label : this.serverMode;
  }

  switchTo(mode: {value: string, label: string}) {
    if (mode.value === this.serverMode) return;
    if (!confirm(`Switch to ${mode.label}? Server will restart and all players will be disconnected.`)) return;
    this.modeLoading = true;
    this.rcon.setServerMode(mode.value).subscribe(
      res => {
        this.serverMode = res.mode;
        this.modeLoading = false;
      },
      () => {
        this.modeLoading = false;
      }
    );
  }
}
