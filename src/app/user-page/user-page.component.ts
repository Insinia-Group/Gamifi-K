import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor() { }

  ngOnInit (): void
  {
    
    var i = document.getElementById( 'avatar' )?.style.backgroundImage.valueOf();
    i = "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg";
  }

 


}
