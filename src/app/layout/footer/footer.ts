import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BERTOORT_DOMAIN, BERTOORT_SUDOKU_GITHUB } from '../../utils/urls/bertoort';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrls: [
    './footer.css', 
    '../../css/layout.css',  
    '../../css/flex.css', 
    '../../css/colors.css', 
    '../../css/icons.css', 
    '../../css/links.css']
})
export class Footer {

  bertoortDomain       = BERTOORT_DOMAIN;
  bertoortSudokuGitHub = BERTOORT_SUDOKU_GITHUB
}
