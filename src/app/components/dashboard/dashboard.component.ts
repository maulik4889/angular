import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { UserRegister } from '../../models/user';
import { ISocialLoginData } from '../../models/user';
import { Title, Meta } from "@angular/platform-browser";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  percentage:any;
  category_tasks : any[] = [];
  // loading= true;
  constructor(private titleService: Title, private meta: Meta, private formBuilder: FormBuilder, 
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Dashboard");
    this.meta.updateTag({ name: 'description', content: 'Sign up to Matutto to start hosting online classes and earning teaching online. Or sign up as a User to book online classes on any subject with peace of mind.' });
// alert(this.router.url.split("/") );

this.getPercentage();
this.getUserNonSelectedCheckList();

  }
  getPercentage(){
      this.userService.getPercentage().subscribe((data) => {
  
        if (data.status == 200) {
          this.percentage = data.data;
        }
      });

  }

  getUserNonSelectedCheckList(){
        this.userService.getUserNonSelectedCheckList().subscribe((data) => {
    
          if (data.status == 200) {
            this.category_tasks = data.data;
          }
        });
  }
}





