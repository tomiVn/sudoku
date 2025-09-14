import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SudokuService } from './sudoku-service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SUDOKU_API_GET_WITH_QUERY } from '../utils/urls/sudoku.api';

describe('SudokuService', () => {

    let service: SudokuService;
    let testBoard: number[][] = Array.from({ length: 9 }, () => Array(9).fill(1));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [

                provideHttpClient(withFetch(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(SudokuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Test sudokuService getOneWithQuery', ((done:  DoneFn) => {
        
        ['easy', 'medium', 'hard', 'random'].forEach((endPoint: string) => {

            service.getOneWithQuery(SUDOKU_API_GET_WITH_QUERY(endPoint)).subscribe(res => {
             
                expect(res).toBeTruthy();
                expect(res?.length).toBe(9);
                expect(res.flat().every(cell => typeof cell === 'number' && !isNaN(cell))).toBeTrue();
            })
        })
        done();
    }));

    it('Test sudokuService getSolution', ((done:  DoneFn) => {
        
        service.getOneWithQuery(SUDOKU_API_GET_WITH_QUERY('random')).subscribe(res => {

            expect(res).toBeTruthy();
            
            service.getSolution(res).subscribe(sol => {

                expect(res).toBeTruthy();
                expect(res?.length).toBe(9);
                expect(res.flat().every(cell => typeof cell === 'number' && !isNaN(cell))).toBeTrue();
                expect(res.every((row, i) => row.every((cell, j) => { 

                        if (cell > 0) {
    
                            return cell === sol[i][j]; 
                        }
    
                        return true; 

                    }))
                ).toBeTrue();
            })
        })
        done();
    }));

    it('Test sudokuService testSolution', ((done:  DoneFn) => {
        
        service.testSolution(testBoard).subscribe(res => {
            expect(res).toBeTruthy();
            expect(['unsolved', 'solved']).toContain(res.status);
        })
        done();
    }));

    it('Test sudokuService getGrade', ((done:  DoneFn) => {

        service.getGrade(testBoard).subscribe(res => {
            expect(res).toBeTruthy();
            expect(['easy', 'meduim', 'hard']).toContain(res.difficulty);
        })

        done();
    }));
});
