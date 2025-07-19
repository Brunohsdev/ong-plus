import { TestBed } from '@angular/core/testing';

import { Campanha } from './campanha';

describe('Campanha', () => {
  let service: Campanha;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Campanha);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
