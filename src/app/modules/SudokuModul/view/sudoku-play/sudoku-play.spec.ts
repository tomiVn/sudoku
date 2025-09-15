import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SudokuPlay, type SudokuStatus } from './sudoku-play';
import { SudokuService } from '../../services/sudoku-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { getLockedFn } from '../../utils/methods/locked';
import { of } from 'rxjs';

describe('SudokuPlay', () => {

    let component:         SudokuPlay;
    let fixture:           ComponentFixture<SudokuPlay>;

    let sudokuService:     SudokuService;

    let currentLevel:      string           = '';   
    let status:            SudokuStatus     = 'unsolved';
    let board!:            number[][];
    let testBoard:         number[][]       = Array.from({ length: 9 }, () => Array(9).fill(0));
    let locked!:           boolean[][];
    let isLoading:         boolean          = false;

    beforeAll(() => {
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2 minutes
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:   [SudokuPlay],
            providers: [
        
                provideHttpClient(withFetch(), withInterceptorsFromDi()),
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


    it('sudokuService create', () => {
        expect(sudokuService).toBeTruthy();
    });

   
    it('should render title', () => {
 
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('suGOku');
    });

    it('OnInit', fakeAsync(() => {
  
        spyOn(component, 'getData').and.callFake(() => {
          component.board = testBoard;
        });

        spyOn(component, 'setDificulty');

        component.ngOnInit();

        tick(60000);

        expect(component.getData).toHaveBeenCalledWith('random');
        expect(component.setDificulty).toHaveBeenCalled();
        expect(component.board.length).toBe(9);
    }));

    it('Test onInputChange Succes', (() => {

        component.board = testBoard;
        component.locked = getLockedFn(testBoard);
        component.onInputChange('5', 0, 0);
        expect(component.board[0][0]).toBe(5);
    }));

    it('Test onInputChange negative value not Succes', (() => {

        component.board = testBoard;
        component.locked = getLockedFn(testBoard);
        component.onInputChange('-1', 0, 0);
        expect(component.board[0][0]).not.toBe(-1);
    }));

    it('Test onInputChange locked value not Succes', (() => {

        component.board = Array.from({ length: 9 }, () => Array(9).fill(1));
        component.locked = getLockedFn(component.board);
        component.onInputChange('2', 0, 0);
        expect(component.board[0][0]).not.toBe(2);
    }));

    it('Test clearBoard Succes', (() => {

        component.board = Array.from({ length: 9 }, () => Array(9).fill(1));

        component.clearBoard();

        expect(component.board.every((row) => row.every((cell) => cell == 0))).toBeTrue();
    }));

    it('Test solveAction Success', fakeAsync(() => {

       component.board = testBoard;

        component.solveAction();

        tick(60000);

        expect(component.status).toContain('solved');
    }));

    it('Test testSolution Success', fakeAsync(() => {

       component.board = testBoard;

        component.testSolution();

        tick(60000);

        expect(['unsolved', 'solved']).toContain(component.status);
    }));

    it('Test sudokuService getGrade', (() => {

        sudokuService.getGrade(testBoard).subscribe(res => {
            expect(res).toBeTruthy();
            expect(['easy', 'medium', 'hard']).toContain(component.currentLevel);
        })
        
    }));

    it('Test sudokuService setDificulty Success', (() => {
        
        component.board = testBoard;
        
        spyOn(component, 'setDificulty').and.callThrough();

        component.setDificulty();

        fixture.detectChanges();

        expect(component.setDificulty).toHaveBeenCalled();
    }));

    it('Test sudokuService getData Success', (() => {

        component.board = testBoard;

        spyOn(component, 'getData').and.callThrough();

        component.getData('random');

        fixture.detectChanges();

        expect(component.getData).toHaveBeenCalled();
        
    }));
});
