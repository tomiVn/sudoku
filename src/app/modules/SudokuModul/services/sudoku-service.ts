import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SUDOKU_API } from '../utils/urls/sudoku.api';
import { map, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  
  http = inject(HttpClient);
  
  getOneWithQuery(endPoitn: string): Observable<any>{

    return this.http.get(SUDOKU_API + '?difficulty=' + endPoitn).pipe(map((res: any) => res.board));
  }
}
