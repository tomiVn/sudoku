import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SUDOKU_API_BOARD, SUDOKU_API_GRADE, SUDOKU_API_SOLVE, SUDOKU_API_VALIDATE } from '../utils/urls/sudoku.api';
import { map, of, type Observable } from 'rxjs';
import { getHttpQuery } from '../utils/methods/get.query';
@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  
  http = inject(HttpClient);
  
  getOneWithQuery(endPoint: string): Observable<number[][]>{

    const params = getHttpQuery('difficulty', endPoint);
    return this.http.get(SUDOKU_API_BOARD, { params }).pipe(map((res: any) => res.board));
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
