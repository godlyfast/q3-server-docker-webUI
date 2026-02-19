import { TestBed } from '@angular/core/testing';

import { RconService } from './rcon.service';

describe('RconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RconService = TestBed.get(RconService);
    expect(service).toBeTruthy();
  });
});
