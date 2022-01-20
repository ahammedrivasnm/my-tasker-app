/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllSubtaskComponent } from './all-subtask.component';

describe('AllSubtaskComponent', () => {
  let component: AllSubtaskComponent;
  let fixture: ComponentFixture<AllSubtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSubtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
