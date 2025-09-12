import { Component, Input } from '@angular/core';
import type { IHeader } from '../interfaces/header.interfaces';

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

  @Input() data: IHeader | undefined;
}
