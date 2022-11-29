import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import {Title,Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public loading =false;

  constructor(private titleService:Title,private meta: Meta,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Pricing");
   
    this.meta.updateTag({ name: 'description', content: 'At Matutto, we are committed to protecting and respecting your privacy. You can read how we collect, use and share information.' });

  }
 

}


