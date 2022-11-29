import { Component, OnInit, ViewChild ,TemplateRef } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { UserRegister } from '../../models/user';
import { ISocialLoginData } from '../../models/user';
import { Title, Meta } from "@angular/platform-browser";
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})


export class BankInfoComponent implements OnInit {

  @ViewChild('slickModal1', { static: true }) slickModal!: SlickCarouselComponent;

  slides1 = [
    {
      img1: './assets/images/barclays.png',
      title: 'Barclays',
    },

    {
      img1: './assets/images/santander.png',
      title: 'Santander',
    },

    {
      img1: './assets/images/hsbc.jpeg',
      title: 'HSBC',
    },

    {
      img1: './assets/images/lloydsbank.png',
      title: 'LLoydsBank',
    },

  ];

  slideConfig1 = {
    'slidesToShow': 5,
    'slidesToScroll': 1,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,



          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,




        }
      }
    ]
  };


  // loading= true;
  constructor(private titleService: Title, private meta: Meta, private formBuilder: FormBuilder, 
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  tab1:boolean = true
  tab2:boolean = false


  //onclick toggling both
  onclickYes()
  {
      this.tab1 = true;
  }

  onclickNo()
  {
    this.tab2=true;
    this.tab1 = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Bank Info");
    this.meta.updateTag({ name: 'description', content: 'Sign up to Matutto to start hosting online classes and earning teaching online. Or sign up as a User to book online classes on any subject with peace of mind.' });
    // alert(this.router.url.split("/") );
    
  }

  next1() {
    this.slickModal.slickNext();
  }
  previous1() {
    this.slickModal.slickPrev();
  }

}





