import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCashierComponent } from './main-cashier.component';

describe('MainCashierComponent', () => {
  let component: MainCashierComponent;
  let fixture: ComponentFixture<MainCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
