import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationsEngineComponent } from './recomendations-engine.component';

describe('RecomendationsEngineComponent', () => {
  let component: RecomendationsEngineComponent;
  let fixture: ComponentFixture<RecomendationsEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendationsEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendationsEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
