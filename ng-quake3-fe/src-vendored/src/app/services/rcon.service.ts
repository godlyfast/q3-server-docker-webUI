import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RconStatus } from '../interfaces/status.rcon';
import { RconServerInfo } from '../interfaces/serverinfo.rcon';

import { merge, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RconService {
  apiURL = `/api/rcon`;

  private settingsCache: {supported: boolean, settings: {[key: string]: string}} | null = null;
  private instagibCache: {supported: boolean, enabled: boolean} | null = null;

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

  public getInstagib(forceRefresh: boolean = false): Observable<{supported: boolean, enabled: boolean}> {
    if (!forceRefresh && this.instagibCache) {
      return of(this.instagibCache);
    }
    return this.httpClient.get<{supported: boolean, enabled: boolean}>('/api/server/instagib').pipe(
      tap(res => this.instagibCache = res)
    );
  }

  public setInstagib(enabled: boolean): Observable<{enabled: boolean, restarting: boolean}> {
    return this.httpClient.post<{enabled: boolean, restarting: boolean}>('/api/server/instagib', {enabled}).pipe(
      tap(res => { if (this.instagibCache) this.instagibCache.enabled = res.enabled; })
    );
  }

  public getOspSettings(forceRefresh: boolean = false): Observable<{supported: boolean, settings: {[key: string]: string}}> {
    if (!forceRefresh && this.settingsCache) {
      return of(this.settingsCache);
    }
    return this.httpClient.get<{supported: boolean, settings: {[key: string]: string}}>('/api/server/settings').pipe(
      tap(res => this.settingsCache = res)
    );
  }

  public setOspSetting(cvar: string, value: string): Observable<{cvar: string, value: string}> {
    return this.httpClient.post<{cvar: string, value: string}>('/api/server/settings', {cvar, value}).pipe(
      tap(res => { if (this.settingsCache) this.settingsCache.settings[res.cvar] = res.value; })
    );
  }

  public invalidateCache(): void {
    this.settingsCache = null;
    this.instagibCache = null;
  }
}

