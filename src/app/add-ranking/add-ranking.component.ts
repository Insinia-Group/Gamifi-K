import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../config/animations.config';

@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.css'],
  animations: [fadeIn]
})
export class AddRankingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
