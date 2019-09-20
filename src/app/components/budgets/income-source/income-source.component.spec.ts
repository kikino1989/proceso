import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSourceComponent } from './income-source.component';

describe('IncomeSourceComponent', () => {
  let component: IncomeSourceComponent;
  let fixture: ComponentFixture<IncomeSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSourceComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
