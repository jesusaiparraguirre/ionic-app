import { TestBed } from '@angular/core/testing';

import { FormatPlayerService } from './format-player.service';

describe('FormatPlayerService', () => {
  let service: FormatPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
