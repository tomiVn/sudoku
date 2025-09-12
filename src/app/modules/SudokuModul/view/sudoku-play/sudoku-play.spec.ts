import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuPlay } from './sudoku-play';

describe('SudokuPlay', () => {
  let component: SudokuPlay;
  let fixture: ComponentFixture<SudokuPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuPlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuPlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
