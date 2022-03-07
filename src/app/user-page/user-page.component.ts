import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { tempProfile } from '../models/profile';
import { HttpService } from '../services/http.service';
declare var $: any;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {
  public profile: tempProfile;
  constructor(private http: HttpService) {}

  @ViewChild('pictureProfile') pictureProfile: ElementRef;

  async ngOnInit(): Promise<void> {
    const profile: any = await this.http.getProfile();
    this.profile = new tempProfile(profile[0].id, profile[0].nick, profile[0].name, profile[0].lastName, profile[0].email, profile[0].description, profile[0].dateBirth, profile[0].avatar, profile[0].role, profile[0].dateJoined, profile[0].status);
    console.log(this.profile);
  }

  toggleDropdown(id: string): void {
    $('#' + id).dropdown('toggle');
  }

}