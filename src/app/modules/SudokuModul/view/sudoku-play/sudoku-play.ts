import { Component } from '@angular/core';
import { Header } from "../../../../layout/header/header";

@Component({
  selector: 'app-sudoku-play',
  imports: [Header],
  templateUrl: './sudoku-play.html',
  styleUrl: './sudoku-play.css'
})
export class SudokuPlay {

  gihubRepo = {
    url: 'https://github.com/bertoort/sugoku'
  }
}
