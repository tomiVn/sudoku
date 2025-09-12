import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku-service';
import { takeWhile, tap } from 'rxjs';
import { getRandomLevelFn } from '../../utils/methods/random.level';
import { LEVELS } from '../../utils/constants/levels';
import { MatButtonModule } from '@angular/material/button';

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
export class SudokuPlay implements OnInit, OnDestroy {
    
    sudokuService = inject(SudokuService);

    currentLevel:   string       = '';
    dificultLevels: string[]     = LEVELS;
    isAlive:        boolean      = true;
    board!:         number[][];

    ngOnInit(): void {

        this.getData(undefined);
    }

    onInputChange = (cellInput: string | undefined, r: number, c: number) => this.board[r][c] = Number(cellInput);
    
    clearBoard    = () => this.board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    
    ngOnDestroy   = () => this.isAlive = false;

    getData(endPoint: string | undefined){

        this.currentLevel = endPoint ? endPoint.toLowerCase() : getRandomLevelFn().toLowerCase();

        this.sudokuService.getOneWithQuery(this.currentLevel)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: number[][]) => this.board = data)
            )
            .subscribe();
    }
}
