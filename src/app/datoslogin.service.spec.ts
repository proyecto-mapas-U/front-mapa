import { TestBed } from '@angular/core/testing';

import { DatosloginService } from './datoslogin.service';

describe('DatosloginService', () => {
  let service: DatosloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
