import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku-service';
import { of, takeWhile, tap, catchError } from 'rxjs';
import { getRandomLevelFn } from '../../utils/methods/random.level';
import { LEVELS } from '../../utils/constants/levels';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { getLockedFn } from '../../utils/methods/locked';

type SudokuStatus = 'solved' | 'broken' | 'unsolved';

@Component({
    selector: 'app-sudoku-play',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './sudoku-play.html',
    styleUrls: [
        './sudoku-play.css',
        '../../../../css/flex.css',
        '../../../../css/colors.css',
        '../../../../css/buttons.css',
        '../../../../css/border.css',
        '../../../../css/icons.css',
        '../../../../css/text.css',
        '../../../../css/layout.css']
})
export class SudokuPlay implements OnInit, OnDestroy{
    
    sudokuService = inject(SudokuService);

    currentLevel:   string       = '';
    dificultLevels: string[]     = LEVELS;
    isAlive:        boolean      = true;
    status:         SudokuStatus = 'unsolved';
    board!:         number[][];
    locked!:        boolean[][];
    isLoading:      boolean      = false;

    ngOnInit(): void {

        this.getData(undefined);
    }

    onInputChange = (cellInput: string | undefined, r: number, c: number) => 
        this.board[r][c] = (Number(cellInput) >= 1 && Number(cellInput) <= 9) && !this.locked[r][c]
            ? Number(cellInput) : this.board[r][c];
    
    clearBoard    = () => {

        this.board  = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
        this.locked = getLockedFn(this.board);
    }
        
    
    ngOnDestroy   = () => this.isAlive = false;

    solveAction(){
        this.isLoading = true;
        this.sudokuService.getSolution(this.board)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: {status: SudokuStatus, solution: number[][]}) => {
                    console.log('[GetSolution Success]', data)
                    this.board     = data?.solution;
                    this.locked    = getLockedFn(data?.solution)
                    this.status    = 'solved';
                    this.isLoading = false;
                }),
                catchError((err: any)=>{
                    console.log('[GetSolution Error]', err);
                    this.isLoading = false;
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
        this.isLoading    = true;
        this.currentLevel = endPoint ? endPoint.toLowerCase() : getRandomLevelFn().toLowerCase();
        this.sudokuService.getOneWithQuery(this.currentLevel)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: number[][]) => {
                    console.log('[GetData Success]', data);
                    this.board     = data;
                    this.locked    = getLockedFn(data);
                    this.status    = 'unsolved';
                    this.isLoading = false;
                }),
                catchError((err: any)=>{
                    console.log('[GetData Error]', err);
                    this.isLoading = false;
                    return of([])
                })
            )
            .subscribe();
    }
}
