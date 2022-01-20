/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllSprintComponent } from './all-sprint.component';

describe('AllSprintComponent', () => {
  let component: AllSprintComponent;
  let fixture: ComponentFixture<AllSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
