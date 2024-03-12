import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcpayviewComponent } from './ecpayview.component';

describe('EcpayviewComponent', () => {
  let component: EcpayviewComponent;
  let fixture: ComponentFixture<EcpayviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcpayviewComponent]
    });
    fixture = TestBed.createComponent(EcpayviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
