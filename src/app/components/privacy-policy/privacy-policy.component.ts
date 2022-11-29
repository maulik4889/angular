import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import {Title,Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  public pages:any;
  public loading =false;

  constructor(private titleService:Title,private meta: Meta,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getPages();
    this.titleService.setTitle("Matutto | Privacy Policy");
   
    this.meta.updateTag({ name: 'description', content: 'At Matutto, we are committed to protecting and respecting your privacy. You can read how we collect, use and share information.' });

  }
  getPages() {
    this.loading = true;

    this.userService.getPages('privacy_policy').subscribe(data => {
      if (data.status == 200) {
        this.pages = data.data.meta_value;
        this.loading = false;

        
      }
    });
  }

}


