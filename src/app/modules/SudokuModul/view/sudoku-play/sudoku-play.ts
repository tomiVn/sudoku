import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { LEVELS } from '../../utils/constants/levels';
import { SudokuService } from '../../services/sudoku-service';
import { takeWhile, tap } from 'rxjs';

@Component({
    selector: 'app-sudoku-play',
    imports: [],
    templateUrl: './sudoku-play.html',
    styleUrls: [
        './sudoku-play.css',
        '../../../../css/flex.css',
        '../../../../css/colors.css',
        '../../../../css/layout.css']
})
export class SudokuPlay implements OnInit, OnDestroy {
    
    sudokuService = inject(SudokuService);

    currentLevel: string = '';
    board!: number[][];
    isAlive: boolean = true;

    ngOnInit(): void {

        this.currentLevel = LEVELS[Math.floor(Math.random() * LEVELS.length)];
        this.sudokuService.getOneWithQuery(this.currentLevel)
            .pipe(
                takeWhile(() => this.isAlive),
                tap((data: number[][]) => this.board = data)
            )
            .subscribe();
    }

    onInputChange(cellInput: string | undefined, r: number, c: number) {

        this.board[r][c] = Number(cellInput);
    }

    clearBoard() {

        this.board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    }

    ngOnDestroy(): void {
        this.isAlive = false;
    }
}
