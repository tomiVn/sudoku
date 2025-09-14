import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SUDOKU_API_GET_WITH_QUERY, SUDOKU_API_GRADE, SUDOKU_API_SOLVE, SUDOKU_API_VALIDATE } from '../utils/urls/sudoku.api';
import { map, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  
  http = inject(HttpClient);
  
  getOneWithQuery(endPoint: string): Observable<any>{

    return this.http.get(SUDOKU_API_GET_WITH_QUERY(endPoint)).pipe(map((res: any) => res.board));
  }

  getSolution(board: number[][]): Observable<any>{

    return this.http.post(SUDOKU_API_SOLVE, { board });
  }

  testSolution(board: number[][]): Observable<any>{

    return this.http.post(SUDOKU_API_VALIDATE, { board });
  }

  getGrade(board: number[][]): Observable<any>{

    return this.http.post(SUDOKU_API_GRADE, { board })
  }
}
