import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelInstComponent } from './rel-inst.component';

describe('RelInstComponent', () => {
  let component: RelInstComponent;
  let fixture: ComponentFixture<RelInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
