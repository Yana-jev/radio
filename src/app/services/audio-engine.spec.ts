import { TestBed } from '@angular/core/testing';

import { AudioEngineService } from './audio-engine';

describe('AudioEngine', () => {
  let service: AudioEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
