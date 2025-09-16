import { TestBed } from '@angular/core/testing';
import { SudokuService } from './sudoku-service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SUDOKU_API_DIFICULTY_ARRAY_ENDPOINTS, SUDOKU_API_BOARD, SUDOKU_API_GRADE, SUDOKU_API_SOLVE, SUDOKU_API_VALIDATE } from '../utils/urls/sudoku.api';
import { STATIC_BOARD } from '../utils/constants/static.board';
import { getBoardWithValueFn } from '../utils/methods/get.board';

describe('SudokuService', () => {

    let service:   SudokuService;
    let testBoard: number[][]             = getBoardWithValueFn(1);
    let httpMock:  HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [

                provideHttpClient(withFetch(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });
        service  = TestBed.inject(SudokuService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Test sudokuService getOneWithQuery', ((done:  DoneFn) => {

        SUDOKU_API_DIFICULTY_ARRAY_ENDPOINTS.forEach((endPoint: string, i: number) => {

            service.getOneWithQuery(endPoint).subscribe(res => {
             
                expect(res).toBeTruthy();
                expect(res?.length).toBe(9);
                expect(res.flat().every(cell => typeof cell === 'number' && !isNaN(cell))).toBeTrue();
            });

            const req = httpMock.expectOne(SUDOKU_API_BOARD + '?difficulty=' + endPoint);
            expect(req.request.method).toBe('GET');
        });

        done();
    }));

   it('Test sudokuService getSolution Success', (done: DoneFn) => {
  
        let res = STATIC_BOARD;

        service.getSolution(STATIC_BOARD).subscribe(sol => {
    
            expect(sol).toBeTruthy();
            expect(sol.solution).toBeTruthy();
    
            res = sol.solution;

            expect(STATIC_BOARD.every((row, i) => row.every((cell, j) =>
                cell > 0 ? cell === sol.solution[i][j] : true ))).toBeTrue();
    
            done();
        });

        const req = httpMock.expectOne(SUDOKU_API_SOLVE);
        expect(req.request.method).toBe('POST');
    
        req.flush({ solution: res });
    });

    it('Test sudokuService getSolution Error', (done: DoneFn) => {
  
        let res = STATIC_BOARD;

        service.getSolution(STATIC_BOARD).subscribe(sol => {
    
            expect(sol).toBeTruthy();
            expect(sol.solution).toBeTruthy();
    
            res = sol.solution;

            expect(STATIC_BOARD.every((row, i) => row.every((cell, j) =>
                cell > 0 ? cell === sol.solution[i][j] : true ))).toBeFalse();
    
            done();
        });

        const req = httpMock.expectOne(SUDOKU_API_SOLVE);
        expect(req.request.method).toBe('POST');
    
        req.flush({ solution: getBoardWithValueFn(1) });
    });

    it('Test sudokuService testSolution', ((done:  DoneFn) => {
        
        service.testSolution(testBoard).subscribe(res => {
            expect(res).toBeTruthy();
            expect(['unsolved', 'solved']).toContain(res.status);
        })

        const req = httpMock.expectOne(SUDOKU_API_VALIDATE);
        expect(req.request.method).toBe('POST');
        done();
    }));

    it('Test sudokuService getGrade', ((done:  DoneFn) => {

        service.getGrade(testBoard).subscribe(res => {

            expect(res).toBeTruthy();
            expect(['easy', 'meduim', 'hard']).toContain(res.difficulty);
        });

        const req = httpMock.expectOne(SUDOKU_API_GRADE);
        expect(req.request.method).toBe('POST');
        done();
    }));
});
