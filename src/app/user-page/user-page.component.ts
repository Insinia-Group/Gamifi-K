import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
declare var $: any;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {

  constructor(private http: HttpService) {}

  @ViewChild('pictureProfile') pictureProfile: ElementRef;

  ngOnInit(): void {
    this.http.getProfile();
  }

  toggleDropdown(id: string): void {
    $('#' + id).dropdown('toggle');
  }

}