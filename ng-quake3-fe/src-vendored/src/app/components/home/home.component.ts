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

  constructor(private rcon: RconService) { }

  ngOnInit() {
    this.rcon.getStatus().subscribe(res => this.rconData = res);
    this.rcon.getServerMode().subscribe(res => this.serverMode = res.mode);
  }

  get modeLabel(): string {
    return this.serverMode === 'cpma' ? 'CPMA' : 'Vanilla Q3';
  }

  get otherMode(): string {
    return this.serverMode === 'cpma' ? 'baseq3' : 'cpma';
  }

  get otherModeLabel(): string {
    return this.serverMode === 'cpma' ? 'Vanilla Q3' : 'CPMA';
  }

  switchMode() {
    const target = this.otherModeLabel;
    if (!confirm(`Switch to ${target}? Server will restart and all players will be disconnected.`)) {
      return;
    }
    this.modeLoading = true;
    this.rcon.setServerMode(this.otherMode).subscribe(
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
