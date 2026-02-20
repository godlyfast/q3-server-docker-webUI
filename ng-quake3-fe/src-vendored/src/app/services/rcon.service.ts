import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RconStatus } from '../interfaces/status.rcon';
import { RconServerInfo } from '../interfaces/serverinfo.rcon';

import { merge, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RconService {
  apiURL = `/api/rcon`;

  constructor(
    private httpClient: HttpClient,
    private socket: Socket
  ) {}

  public getStatus() {
    return merge (
      this.httpClient.get<RconStatus>(`${this.apiURL}/status`),
      this.socket.fromEvent<RconStatus>('rcon:status')
    );
  }

  public getServerInfo() {
    return merge (
      this.httpClient.get<RconServerInfo[]>(`${this.apiURL}/serverinfo`),
      // this.socket.fromEvent<RconStatus>('rcon:status')
    );
  }

  public setVar(q3Var: string, value?: string) {
      this.httpClient.post<string>(`${this.apiURL}/setVar`, {q3Var, value}).subscribe();
  }

  public getServerMode(): Observable<{mode: string}> {
    return this.httpClient.get<{mode: string}>('/api/server/mode');
  }

  public setServerMode(mode: string): Observable<{mode: string, restarting: boolean}> {
    return this.httpClient.post<{mode: string, restarting: boolean}>('/api/server/mode', {mode});
  }
}

