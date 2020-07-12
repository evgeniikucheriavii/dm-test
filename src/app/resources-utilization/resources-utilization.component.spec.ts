import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesUtilizationComponent } from './resources-utilization.component';

describe('ResourcesUtilizationComponent', () => {
  let component: ResourcesUtilizationComponent;
  let fixture: ComponentFixture<ResourcesUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
