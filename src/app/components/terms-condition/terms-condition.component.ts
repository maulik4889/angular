import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import {Title,Meta} from "@angular/platform-browser";


@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  public pages:any;
  public loading = false;

  constructor(private titleService:Title,private meta: Meta,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Terms and Conditions");

    this.meta.updateTag({ name: 'description', content: 'These terms and conditions govern all use of the Matutto website and all content, services and products available at or through the website. ' });

    this.getPages();
  }
  getPages() {
    this.loading = true;

    this.userService.getPages('term').subscribe(data => {
      if (data.status == 200) {
        this.pages = data.data.meta_value;
        this.loading = false;
        
      }
    });
  }

}

