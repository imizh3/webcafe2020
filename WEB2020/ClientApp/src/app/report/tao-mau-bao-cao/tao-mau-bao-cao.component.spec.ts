import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMauBaoCaoComponent } from './tao-mau-bao-cao.component';

describe('TaoMauBaoCaoComponent', () => {
  let component: TaoMauBaoCaoComponent;
  let fixture: ComponentFixture<TaoMauBaoCaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMauBaoCaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMauBaoCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
