import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietBanComponent } from './chi-tiet-ban.component';

describe('ChiTietBanComponent', () => {
  let component: ChiTietBanComponent;
  let fixture: ComponentFixture<ChiTietBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
