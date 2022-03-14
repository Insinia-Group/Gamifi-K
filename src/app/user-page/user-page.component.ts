import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../config/animations.config';
import {isBase64} from '../helpers/helpers';
import {tempProfile} from '../models/profile';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  animations: [fadeIn]
})

export class UserPageComponent implements OnInit {
  public profile: tempProfile;
  public profileForm: FormGroup;

  constructor(private http: HttpService, private router: Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(30)]),
      nick: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(30)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(30)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(300)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(60)]),
      dateBirth: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.setFormValues();
  }

  @ViewChild('pictureProfile') pictureProfile: ElementRef;

  async ngOnInit(): Promise<void> {

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }

    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (statusToken) {
      console.log("Token valid");
    }

    const profile: any = await this.http.getProfile();
    if (isBase64(profile[0].avatar)) {
      profile[0].avatar = atob(profile[0].avatar);
    }
    this.profile = new tempProfile(profile[0].id, profile[0].nick, profile[0].name, profile[0].lastName, profile[0].email, profile[0].description, profile[0].dateBirth, profile[0].avatar, profile[0].role, profile[0].dateJoined, profile[0].status);
  }

  setFormValues() {
    if (this.profile) {
      this.profileForm.controls.dateBirth.setValue(this.profile.dateBirth);
      this.profileForm.controls.nick.setValue(this.profile.nick);
      this.profileForm.controls.name.setValue(this.profile.name);
      this.profileForm.controls.lastName.setValue(this.profile.lastName);
    }
  }

  toggleDropdown(id: string): void {
    $('#' + id).dropdown('toggle');
  }

  updateSubmit() {
    console.log('asd')
  }
}