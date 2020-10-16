import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscFormComponent } from './misc-form.component';

describe('MiscFormComponent', () => {
  let component: MiscFormComponent;
  let fixture: ComponentFixture<MiscFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
