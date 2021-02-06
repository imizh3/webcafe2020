import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InHoaDonComponent } from './in-hoa-don.component';

describe('InHoaDonComponent', () => {
  let component: InHoaDonComponent;
  let fixture: ComponentFixture<InHoaDonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InHoaDonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InHoaDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
