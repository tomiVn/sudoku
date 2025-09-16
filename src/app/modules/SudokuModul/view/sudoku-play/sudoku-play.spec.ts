import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SudokuPlay } from './sudoku-play';
import { SudokuService } from '../../services/sudoku-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { getLockedFn } from '../../utils/methods/locked';
import { DIFFICULTY_LEVELS_ARRAY } from '../../utils/constants/difficulty.levels';
import { getBoardWithValueFn } from '../../utils/methods/get.board';
import { STATIC_BOARD } from '../../utils/constants/static.board';

describe('SudokuPlay', () => {

    let component:         SudokuPlay;
    let fixture:           ComponentFixture<SudokuPlay>;
    let sudokuService:     SudokuService;
    let testBoard:         number[][]       = STATIC_BOARD;
    
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

        component.board  = getBoardWithValueFn(1);
        component.locked = getLockedFn(component.board);
        component.onInputChange('2', 0, 0);
        expect(component.board[0][0]).not.toBe(2);
    }));

    it('Test clearBoard Succes', (() => {

        component.board = getBoardWithValueFn(1);

        component.clearBoard();

        fixture.detectChanges();

        expect(component.board.every((row) => row.every((cell) => cell == 0))).toBeTrue();
    }));

    it('Test solveAction Success', fakeAsync(() => {

       component.board = testBoard;

        component.solveAction();

        fixture.detectChanges();

        tick(60000);

        expect(component.status).toContain('solved');
    }));

    it('Test testSolution Success', fakeAsync(() => {

       component.board = testBoard;

        component.testSolution();

        fixture.detectChanges();

        tick(60000);

        expect(['unsolved', 'solved']).toContain(component.status);
    }));

    it('Test sudokuService setDificulty Success', ((done: DoneFn) => {
        
        component.board = testBoard;
        
        spyOn(component, 'setDificulty').and.callThrough();

        component.setDificulty();

        fixture.detectChanges();

        expect(component.setDificulty).toHaveBeenCalled();

        setTimeout(() => {

            expect(DIFFICULTY_LEVELS_ARRAY).toContain(component.currentLevel);
        }, 120000);
        
        done();
    }));

    it('Test sudokuService getData Success', ((done: DoneFn) => {

        spyOn(component, 'getData').and.callThrough();

        component.getData('random');

        fixture.detectChanges();

        expect(component.getData).toHaveBeenCalled();

        setTimeout(() => {

            expect(component.board.length).toBe(9);
        }, 120000);

        done();
    }));
});
