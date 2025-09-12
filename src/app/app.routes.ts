import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Sugoku',
        loadComponent: () => import('./modules/SudokuModul/view/sudoku-play/sudoku-play').then(m => m.SudokuPlay),
    },
];
