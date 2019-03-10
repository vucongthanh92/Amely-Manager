/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CensorshipComponent } from './censorship.component';

describe('CensorshipComponent', () => {
  let component: CensorshipComponent;
  let fixture: ComponentFixture<CensorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
