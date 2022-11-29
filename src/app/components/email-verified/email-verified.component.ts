import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Title, Meta } from "@angular/platform-browser";


@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent implements OnInit {
 
  loading= true;
  constructor(private titleService: Title, private meta: Meta, private formBuilder: FormBuilder, 
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
   ) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Email Verified");
    this.meta.updateTag({ name: 'description', content: 'Sign up to Matutto to start hosting online classes and earning teaching online. Or sign up as a User to book online classes on any subject with peace of mind.' });
// alert(this.router.url.split("/") );


   this.verifyUser(); 
  }

  verifyUser(){
     var url =this.router.url.split("/") ;
     var url_last= url[2];


    this.userService.verifyUser({token:url_last})
    .subscribe((res) => {
  //    console.log(res,'sjdkasjkdjaksdjkajs');
      if (res.status === 200) {
        this.loading=false;
        }
      });
  }
 
}





