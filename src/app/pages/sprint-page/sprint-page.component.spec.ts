/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SprintPageComponent } from './sprint-page.component';

describe('SprintPageComponent', () => {
  let component: SprintPageComponent;
  let fixture: ComponentFixture<SprintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
