import { TestBed } from '@angular/core/testing';

import { BoardStatusApiService } from './board-status-api.service';

describe('BoardStatusApiService', () => {
  let service: BoardStatusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStatusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
