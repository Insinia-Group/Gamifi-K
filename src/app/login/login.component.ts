import { Component, OnInit } from '@angular/core';
import { API } from '../models/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const b = new API();
    b.toThisPath('/asd');
    console.log(b.addParameter('name', 'paco'));
    console.log(b.addParameter('id', '3'));
    console.log(b.addMultipleParameters(['edad', 'pais'], ['13', 'lituania']));
    b.empty();
  }
}
