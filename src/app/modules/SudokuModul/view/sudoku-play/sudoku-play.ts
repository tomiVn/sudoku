import { Component, inject, type AfterViewInit, type OnDestroy, type OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku-service';
import { of, takeWhile, tap, catchError } from 'rxjs';
import { getRandomLevelFn } from '../../utils/methods/random.level';
import { LEVELS } from '../../utils/constants/levels';
import { MatButtonModule } from '@angular/material/button';

type SudokuStatus = 'solved' | 'unsolved';

@Component({
    selector: 'app-sudoku-play',
    imports: [MatButtonModule],
    templateUrl: './sudoku-play.html',
    styleUrls: [
        './sudoku-play.css',
        '../../../../css/flex.css',
        '../../../../css/colors.css',
        '../../../../css/buttons.css',
         '../../../../css/border.css',
        '../../../../css/layout.css']
})
export class SudokuPlay implements OnInit, OnDestroy{
    
    sudokuService = inject(SudokuService);

    currentLevel:   string       = '';
    dificultLevels: string[]     = LEVELS;
    isAlive:        boolean      = true;
    status:         SudokuStatus = 'unsolved';
    board!:         number[][];

    ngOnInit(): void {

        this.getData(undefined);
    }

    onInputChange = (cellInput: string | undefined, r: number, c: number) => this.board[r][c] = Number(cellInput);
    
    clearBoard    = () => this.board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    
    ngOnDestroy   = () => this.isAlive = false;

    solveAction(){
        
        this.sudokuService.getSolution(this.board)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: {status: SudokuStatus, solution: number[][]}) => {
                    console.log('[GetSolution Success]', data)
                    this.board   = data.solution;
                    this.status  = 'solved';
                }),
                catchError((err: any)=>{
                    console.log('[GetSolution Error]', err);
                    return of([])
                })
            )
            .subscribe();
    }

    testSolution(){

        this.sudokuService.testSolution(this.board)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((res: {status: SudokuStatus}) => {
                    console.log('[TestSolution Success]', res);
                    this.status = res?.status;
                }),
                catchError((err: any)=>{
                    console.log('[TestSolution Error]', err);
                    return of([])
                })
            )
            .subscribe();
    }

    getData(endPoint: string | undefined){

        this.currentLevel = endPoint ? endPoint.toLowerCase() : getRandomLevelFn().toLowerCase();
        this.sudokuService.getOneWithQuery(this.currentLevel)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: number[][]) => {
                    console.log('[GetData Success]', data);
                    this.board    = data;
                    this.status   = 'unsolved';
                }),
                catchError((err: any)=>{
                    console.log('[GetData Error]', err);
                    return of([])
                })
            )
            .subscribe();
    }
}
