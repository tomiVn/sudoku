import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SUDOKU_API } from '../utils/urls/sudoku.api';
import { map, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  
  http = inject(HttpClient);
  
  getOneWithQuery(endPoint: string): Observable<any>{

    return this.http.get(SUDOKU_API + 'board?difficulty=' + endPoint).pipe(map((res: any) => res.board));
  }

  getSolution(data: number[][]): Observable<any>{

    return this.http.post(SUDOKU_API + 'solve', { board: data });
  }

  testSolution(data: number[][]): Observable<any>{

    return this.http.post(SUDOKU_API + 'validate', { board: data });
  }
}
