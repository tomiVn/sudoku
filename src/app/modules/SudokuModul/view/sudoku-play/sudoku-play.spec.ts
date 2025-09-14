import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SudokuPlay, type SudokuStatus } from './sudoku-play';
import { SudokuService } from '../../services/sudoku-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';

describe('SudokuPlay', () => {

    let component:         SudokuPlay;
    let fixture:           ComponentFixture<SudokuPlay>;

    let sudokuService:     SudokuService;

    let currentLevel:      string           = '';   
    let status:            SudokuStatus     = 'unsolved';
    let board!:            number[][];
    let locked!:           boolean[][];
    let isLoading:         boolean          = false;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports:   [SudokuPlay],
            providers: [
                provideHttpClient(),          
                provideHttpClientTesting(),
                SudokuService           
            ]
        })
        .compileComponents();

        fixture           = TestBed.createComponent(SudokuPlay);
        component         = fixture.componentInstance;
        sudokuService     = TestBed.inject(SudokuService);
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('SudokuService', () => {
        expect(sudokuService).toBeTruthy();
    });

   
    it('should render title', () => {
 
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('suGOku');
    });

    it('On Init', fakeAsync(() => {
  
        spyOn(component, 'getData').and.callFake(() => {
          component.board = Array.from({ length: 9 }, () => Array(9).fill(0));
        });

        spyOn(component, 'setDificulty');

        component.ngOnInit();
        tick(60000);
        expect(component.getData).toHaveBeenCalledWith('random');
        expect(component.setDificulty).toHaveBeenCalled();
        expect(component.board.length).toBe(9);
    }));

    it('Test setDificulty', fakeAsync(() => {

        const mockResponse = { difficulty: 'medium' } as any;
        
        board  = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 1));
    
        component.setDificulty();

        tick(60000); 

        fixture.detectChanges();
        expect(['easy', 'medium', 'hard']).toContain(component.currentLevel);
  }));

});
