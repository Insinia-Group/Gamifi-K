import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeIn} from '../config/animations.config';
import {calculateSize} from '../helpers/helpers';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.css'],
  animations: [fadeIn],
})
export class AddRankingComponent implements OnInit {
  public image: any;
  public rankingForm: FormGroup;
  @ViewChild('rankingPicture') rankingPicture: ElementRef;

  constructor(private router: Router, private http: HttpService) {
    this.image = {
      base: undefined,
      name: undefined,
      size: undefined,
      type: undefined,
      ready: false,
      validate: false,
    };
    this.rankingForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(30),
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(70),
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
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

  generateCode() {
    const length = 5;
    var code = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.rankingForm.controls['code'].setValue(code);
  }

  create() {
    const form: any = {
      name: this.rankingForm.controls['name'].value,
      code: this.rankingForm.controls['code'].value,
      description: this.rankingForm.controls['description'].value,
    };
    if (this.image.base) form['image'] = this.image.base
    console.log(form);
  }
}
