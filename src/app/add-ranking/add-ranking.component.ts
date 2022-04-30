import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fadeIn } from '../config/animations.config';
import { calculateSize } from '../helpers/helpers';

@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.css'],
  animations: [fadeIn]
})
export class AddRankingComponent implements OnInit {
  public image: any;
  @ViewChild('rankingPicture') rankingPicture: ElementRef;

  constructor() {
    this.image = {
      base: undefined,
      name: undefined,
      size: undefined,
      type: undefined,
      ready: false,
    };
  }

  ngOnInit(): void {
  }

  async readURL(event: any) {
    if (!event) throw 'No event provided';
    const file = event.target.files[0];
    if (!file) throw 'No file provided';
    this.image.name = file.name;
    this.image.size = file.size;
    this.image.type = file.type;
    this.image.base = null;
    this.image.ready = false;
    const reader = new FileReader();
    reader.onload = () => (this.image.base = reader.result);
    try {
      reader.readAsDataURL(file);
      this.image.ready = true;
      this.rankingPicture.nativeElement.innerHTML =
        this.image.name + ' ' + calculateSize(this.image.size);
    } catch (e) {
      throw 'Image selection cancelled';
    }
  }

}
