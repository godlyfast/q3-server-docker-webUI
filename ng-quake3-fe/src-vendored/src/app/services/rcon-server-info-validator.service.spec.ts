import { TestBed } from '@angular/core/testing';

import { RconServerInfoValidatorService } from './rcon-server-info-validator.service';

describe('RconServerInfoValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RconServerInfoValidatorService = TestBed.get(RconServerInfoValidatorService);
    expect(service).toBeTruthy();
  });
});
