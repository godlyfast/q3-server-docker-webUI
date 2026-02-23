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

  public sendCommand(q3var: string, value?: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/setVar`, {q3var, value});
  }

  public getServerMode(): Observable<{mode: string}> {
    return this.httpClient.get<{mode: string}>('/api/server/mode');
  }

  public setServerMode(mode: string): Observable<{mode: string, restarting: boolean}> {
    return this.httpClient.post<{mode: string, restarting: boolean}>('/api/server/mode', {mode});
  }

  public getInstagib(): Observable<{supported: boolean, enabled: boolean}> {
    return this.httpClient.get<{supported: boolean, enabled: boolean}>('/api/server/instagib');
  }

  public setInstagib(enabled: boolean): Observable<{enabled: boolean, restarting: boolean}> {
    return this.httpClient.post<{enabled: boolean, restarting: boolean}>('/api/server/instagib', {enabled});
  }

  public getOspSettings(): Observable<{supported: boolean, settings: {[key: string]: string}}> {
    return this.httpClient.get<{supported: boolean, settings: {[key: string]: string}}>('/api/server/settings');
  }

  public setOspSetting(cvar: string, value: string): Observable<{cvar: string, value: string}> {
    return this.httpClient.post<{cvar: string, value: string}>('/api/server/settings', {cvar, value});
  }
}

