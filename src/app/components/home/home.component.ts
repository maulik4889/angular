import {
  Component, OnInit, ViewChild, ElementRef,TemplateRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, 
  ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { Title, Meta } from "@angular/platform-browser";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit  {
  @ViewChild('slickModal4', { static: true })
  slickModal4!: SlickCarouselComponent;
 

 
  email:any='';
  public play=0;
public flag= false;
  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 1,
    arrows: false,
    dots: false,
  
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          "autoplay": false,
         
        
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          "autoplay": false,

          

        }
      }
    ]
  };
  
  


  slides = [
    {
      img: './assets/images/Emma.png',
      title:'EMMA',

      subtitle:'“Finding housing in London was such a struggle, I wish Mattuto existed at the time. My move would have been so much more stress-free.” ',


    },

    {
      img: './assets/images/Eleonora.png',
      title:'ELEONORA',

      subtitle:'“Matutto would have been a game-changer for me. It was so difficult to find the best areas to live or know the most important places.” ',


    },
    {
      img: './assets/images/Joseph.png',
      title:'JOSEPH',

      subtitle:'“Coming from South Korea, moving to London was incredibly difficult. Had Matutto been around I could have saved myself a lot to time, money and stress.” ',


    },

    {
      img: './assets/images/Salinna.png',
      title:'SALINNA',

      subtitle:'“Moving to London alone from South East Asia was a big challenge. Information online was too dispersed. Matutto`s tools would have been super useful!” ',


    },
    
  ];
  slides2= [
    {
      img: './assets/images/house.png',
      title:'Right To Rent (RTR)',
      subtitle:'If you have the legal right to live in UK, you have the right to rent. ',


    },

    {
      img: './assets/images/money.png',
      title:'Proof of Income',
      subtitle:'You should be able to prove that you can afford rent. If you don’t have a regular income, your landlord may ask you for a UK Guarantor or to pay rent upfront.  There are companies who can provide a Guarantor. ',    },
    {
      img: './assets/images/deposit.png',
      title:'Deposit',
      subtitle:'You will likely have to pay a deposit that’s refundable at the end of your tenancy.',  
    para2:'Not more than 5 weeks’ worth of rent (where annual rent is less than £50,000) '   },
    {
      img: './assets/images/book.png',
      title:'References',
      subtitle:'Some landlords may ask for  references of previous rentals. It’s handy to keep your previous landlord’s contract details or ask them to write a referrence when you leave. ',     },
    
  ];

  constructor(private titleService: Title,private formBuilder: FormBuilder, private meta: Meta, private modal: NgbModal, private _fb: FormBuilder, private router: Router, private userService: UserService, private route: ActivatedRoute) {
   
  }

  ngOnInit() {
    this.titleService.setTitle("Matutto | The Platform for Expats That Helps You Move Abroad");
    this.meta.updateTag({ name: 'description', content: "Made for Expats, Built by Expats. Meet people, find information and feel prepared for your relocation. Because moving abroad is easier with your people."});
  
    
  }


  

 

  
 next() {
  this.slickModal4.slickNext();
}
previous() {
  this.slickModal4.slickPrev();
}

}
  
