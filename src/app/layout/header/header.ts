import { Component, Input } from '@angular/core';
import type { IHeader } from '../interfaces/header.interfaces';
import { BERTOORT_SUDOKU_GITHUB } from '../../utils/urls/bertoort';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrls: [
    './header.css', 
    '../../css/colors.css', 
    '../../css/text.css',
    '../../css/links.css'
  ]
})
export class Header {

  bertoortSudokuGitHub = BERTOORT_SUDOKU_GITHUB;
}
