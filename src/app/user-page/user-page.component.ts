import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '../config/animations.config';
import { calculateSize, isBase64 } from '../helpers/helpers';
import { tempProfile } from '../models/profile';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { ProfilePicture } from '../interface/image';
declare var $: any;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  animations: [fadeIn]
})

export class UserPageComponent implements OnInit {
  public profile: tempProfile;
  public profileForm: any;
  public profilePictureForm: any;
  public image: ProfilePicture;

  constructor(private http: HttpService, private router: Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      nick: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(300)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
      dateBirth: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.setFormValues();
    this.image = {
      base: undefined,
      name: undefined,
      size: undefined,
      type: undefined,
      ready: false
    }
  }

  @ViewChild('pictureProfile') profilePicture: ElementRef;
  @ViewChild('profilePictureLabel') profilePictureLabel: ElementRef;

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    const profile: any = await this.http.getProfile();
    if (isBase64(profile[0].avatar)) {
      profile[0].avatar = atob(profile[0].avatar);
    }
    this.profile = new tempProfile(profile[0].id, profile[0].nick, profile[0].name, profile[0].lastName, profile[0].email, profile[0].description, profile[0].dateBirth, profile[0].avatar, profile[0].role, profile[0].dateJoined, profile[0].status);
    this.setFormValues();
  }

  setFormValues() {
    const controls = this.profileForm.controls;
    if (this.profile) {
      controls.dateBirth.setValue(this.profile.dateBirth);
      controls.nick.setValue(this.profile.nick);
      controls.name.setValue(this.profile.name);
      controls.email.setValue(this.profile.email);
      controls.lastName.setValue(this.profile.lastName);
      controls.description.setValue(this.profile.description);
    }
  }

  async readURL(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image.name = file.name;
      this.image.size = file.size;
      this.image.type = file.type;
      this.image.base = null;
      this.image.ready = false;
    }
    const reader = new FileReader();
    reader.onload = () => this.image.base = reader.result;
    reader.readAsDataURL(file);
    this.image.ready = true;
    this.profilePictureLabel.nativeElement.innerHTML = this.image.name + ' ' + calculateSize(this.image.size);
  }

  modal(id: string, state: string): void {
    $('#' + id).modal(state);
  }

  async updateProfilePicture() {
    const image = {
      image: this.image.base
    }
    await this.http.setProfilePicture(image);
  }

  updateSubmit() {
    console.log('asd')
  }
}