import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFMComponent } from './rfm.component';

describe('RFMComponent', () => {
  let component: RFMComponent;
  let fixture: ComponentFixture<RFMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
