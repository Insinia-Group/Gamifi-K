import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  animations: [fadeIn],
})
export class UserPageComponent implements OnInit {
  public profile: tempProfile | any | null;
  public profileForm: any;
  public profilePictureForm: any;
  public image: ProfilePicture;
  public editProfile: boolean;
  public isValidToUpdate: boolean;

  constructor(private http: HttpService, private router: Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      nick: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(120),
        Validators.email,
        Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
      ]),
      dateBirth: new FormControl('', [
        Validators.required,
        this.dateValidator.bind(this),
      ]),
    });
    this.setFormValues();
    this.image = {
      base: undefined,
      name: undefined,
      size: undefined,
      type: undefined,
      ready: false,
    };
  }

  @ViewChild('toggleEditBtn') toggleEditBtn: ElementRef;
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
    await this.setProfile();
    this.profileForm.controls.name.valueChanges.subscribe(() =>
      this.isChanged('name')
    );
    this.profileForm.controls.lastName.valueChanges.subscribe(() =>
      this.isChanged('lastName')
    );
    this.profileForm.controls.nick.valueChanges.subscribe(() =>
      this.isChanged('nick')
    );
    this.profileForm.controls.email.valueChanges.subscribe(() =>
      this.isChanged('email')
    );
    this.profileForm.controls.description.valueChanges.subscribe(() =>
      this.isChanged('description')
    );
    this.profileForm.controls.dateBirth.valueChanges.subscribe(() =>
      this.isChanged('dateBirth')
    );
    this.profileForm.controls.email.disable();
  }

  setFormValues() {
    const controls = this.profileForm.controls;
    if (!controls) throw 'Error with the profile data';
    if (this.profile) {
      controls.dateBirth.setValue(this.profile.dateBirth);
      controls.nick.setValue(this.profile.nick);
      controls.name.setValue(this.profile.name);
      controls.email.setValue(this.profile.email);
      controls.lastName.setValue(this.profile.lastName);
      controls.description.setValue(this.profile.description);
    }
  }

  toggleEdit() {
    this.editProfile = !this.editProfile;
    if (this.editProfile) {
      this.toggleEditBtn.nativeElement.innerHTML =
        ' Dejar de editar el perfil <i class="ms-1 bi bi-pen"></i>';
    } else {
      this.toggleEditBtn.nativeElement.innerHTML =
        ' Editar perfil <i class="ms-1 bi bi-pen"></i>';
    }
  }

  async readURL(event: any) {
    if (!event) throw 'Not event provided';
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
      this.profilePictureLabel.nativeElement.innerHTML =
        this.image.name + ' ' + calculateSize(this.image.size);
    } catch (e) {
      throw 'Image selection cancelled';
    }
  }

  modal(id: string, state: string): void {
    if (!id) throw 'You must provide an id';
    if (!state) throw 'You muste provide a state';
    $('#' + id).modal(state);
  }

  async updateProfilePicture() {
    const image = {
      image: this.image.base,
    };
    await this.http.setProfilePicture(image);
    this.profile = null;
    await this.setProfile();
  }

  async setProfile() {
    const profile: any = await this.http.getProfile();
    if (isBase64(profile[0].avatar)) {
      profile[0].avatar = atob(profile[0].avatar);
    }
    this.profile = new tempProfile(
      profile[0].id,
      profile[0].nick,
      profile[0].name,
      profile[0].lastName,
      profile[0].email,
      profile[0].description,
      profile[0].dateBirth,
      profile[0].avatar,
      profile[0].role,
      profile[0].dateJoined,
      profile[0].status
    );
    this.setFormValues();
  }

  async updateSubmit() {
    const profile: any = {};
    Object.keys(this.profileForm.controls).forEach((key) => {
      if (this.profileForm.controls[key].value !== this.profile[key]) {
        profile[key] = this.profileForm.controls[key].value
      }
    })
    if (!profile) throw 'You must change your profile data'
    if (profile) {
      await this.http.updateProfile(profile);
      await this.setProfile();
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    let today: string | Date = new Date();
    today = today.toISOString().slice(0, -14);
    if (this.profileForm) {
      if (typeof this.profileForm !== 'undefined') {
        if (control.value < '1900-1-1') {
          return { preOld: true };
        } else if (control.value > today) {
          return { postToday: true };
        }
      }
    }
    return null;
  }

  isChanged(control: string): any {
    if (this.profile) {
      if (this.profile[control] !== this.profileForm.controls[control].value) {
        this.isValidToUpdate = true;
      } else {
        this.isValidToUpdate = false;
      }
    }
    return null;
  }
}
