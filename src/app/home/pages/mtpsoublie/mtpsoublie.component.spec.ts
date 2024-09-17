import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtpsoublieComponent } from './mtpsoublie.component';

describe('MtpsoublieComponent', () => {
  let component: MtpsoublieComponent;
  let fixture: ComponentFixture<MtpsoublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtpsoublieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtpsoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
