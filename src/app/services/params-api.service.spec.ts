/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParamsApiService } from './params-api.service';

describe('Service: ParamsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamsApiService]
    });
  });

  it('should ...', inject([ParamsApiService], (service: ParamsApiService) => {
    expect(service).toBeTruthy();
  }));
});
