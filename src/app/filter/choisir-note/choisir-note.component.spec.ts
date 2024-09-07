import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirNoteComponent } from './choisir-note.component';

describe('ChoisirNoteComponent', () => {
  let component: ChoisirNoteComponent;
  let fixture: ComponentFixture<ChoisirNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoisirNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
