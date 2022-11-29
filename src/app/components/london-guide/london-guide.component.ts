import {
  Component, OnInit, ViewChild, ElementRef, TemplateRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { Title, Meta } from "@angular/platform-browser";
import { environment } from '../../../environments/environment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-london-guide',
  templateUrl: './london-guide.component.html',
  styleUrls: ['./london-guide.component.scss']
})

export class LondonGuideComponent implements OnInit {
  @ViewChild('slickModal', { static: true }) slickModal!: SlickCarouselComponent;
  @ViewChild('slickModal1', { static: true }) slickModal1!: SlickCarouselComponent;
  @ViewChild('slickModal2', { static: true }) slickModal2!: SlickCarouselComponent;

  slides=[{image:''},{votes:''},{title:''},{three_bed_price:''},{one_bed_price:''}];
  email: any = '';
  public play = 0;
  public flag = false;
  slideConfig = {
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
          "autoplay": false,


          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          "autoplay": false,



        }
      }
    ]
  };
  slideConfig2 = {
    'slidesToShow': 5,
    'slidesToScroll': 1,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          "autoplay": true,


          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          "autoplay": true,



        }
      }
    ]
  };

  slideConfig1 = {
    'slidesToShow': 4,
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
  env = environment;
  bookingForm!: FormGroup;
  bookingForm1!: FormGroup;

  submitted = false;
  checklistForm!: FormGroup;
  submitted1 = false;
  submitted3 = false;

  submitted2 = false;

  slides1 = [
    {
      img1: './assets/images/SpareRoom.PNG',
      img2: './assets/images/GreenRating.PNG',
      title: 'SpareRoom',
      link: 'https://www.spareroom.co.uk/',

      subtitle: 'Best for house sharing',


    },

    {
      img1: './assets/images/RightMove.PNG',
      img2: './assets/images/ParrotRating.PNG',
      title: 'Rightmove',
      link: 'https://www.rightmove.co.uk/',
      subtitle: ' ',
    },
    {
      img1: './assets/images/OpenRent1.png',
      img2: './assets/images/ParrotRating.PNG',
      title: 'OpenRent',
      link: 'https://www.openrent.co.uk/',

      subtitle: 'Rent directly from owners ',
    },
    {
      img1: './assets/images/Zoopla.PNG',
      img2: './assets/images/OrangeRating.PNG',
      title: 'Zoopla',
      link: 'https://www.zoopla.co.uk/',
      subtitle: ' ',
    },

  ];

  slides2 = [
    {
      img: './assets/images/house.png',
      title: 'Right To Rent (RTR)',
      subtitle: 'If you have the legal right to live in the UK, you have the right to rent. ',


    },

    {
      img: './assets/images/money.png',
      title: 'Proof of Income',
      subtitle: 'You should be able to prove that you can afford rent. If you don’t have a regular income, your landlord may ask you for a UK Guarantor or to pay rent upfront.  There are companies who can provide a Guarantor. ',
    },
    {
      img: './assets/images/deposit.png',
      title: 'Deposit',
      subtitle: 'You will likely have to pay a deposit that’s refundable at the end of your tenancy.',
      para2: 'Not more than 5 weeks’ worth of rent (where annual rent is less than £50,000) '
    },
    {
      img: './assets/images/book.png',
      title: 'References',
      subtitle: 'Some landlords may ask for  references of previous rentals. It’s handy to keep your previous landlord’s contract details or ask them to write a referrence when you leave. ',
    },

  ];
  modalRef!: BsModalRef;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private meta: Meta, private modal: NgbModal, public modalService: BsModalService, private _fb: FormBuilder, private router: Router, private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.titleService.setTitle("Matutto | The London Guide");
    this.meta.updateTag({ name: 'description', content: "The ultimate reliable guide when moving to London - Informed by other expats! Discover everything you need to rent in London and the best places to live." });
    this.bookingForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      place: ['', [Validators.required]]
    });
    this.bookingForm1 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.checklistForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.getNeighbours();
  }
  get formInputs() { return this.bookingForm.controls; }
  get formInputs2() { return this.bookingForm1.controls; }

  get formInputs1() { return this.checklistForm.controls; }

  openVotePopup(votetemplate: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      votetemplate,
      Object.assign({}, { class: 'gray modal-md ' })
    );
  }

  openRequestBuddyPopup(requestbuddy: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      requestbuddy,
      Object.assign({}, { class: 'gray modal-lg width-60' })
    );
  }
  openChecklist(checklist: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      checklist,
      Object.assign({}, { class: 'gray modal-md' })
    );

  }

  openMessagePopup(sendmessage: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      sendmessage,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  bookingEnquiry() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.bookingForm1.invalid) {
      return;
    } else {
      let formData = new FormData();
 
      formData.append('email', this.bookingForm1.value.email);
      formData.append('page', this.env.url);

      this.userService.bookingEnquiry(formData).subscribe((data) => {

        if (data.status == 200) {
          this.flag = true;
          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: "#FF5700"
          }).then((result: any) => {
            window.location.reload();

          });

        }
      }, error => {

      });
    }
  }


  toNeighbours() {
    document.getElementById("toNeighbours")!.scrollIntoView();
  }

  toHousing() {
    document.getElementById("toHousing")!.scrollIntoView();

  }
  toChecklist() {
    document.getElementById("toChecklist")!.scrollIntoView();

  }
  toRent() {
    document.getElementById("toRent")!.scrollIntoView();

  }
  toExpat() {
    document.getElementById("toExpat")!.scrollIntoView();

  }
  toBanking() {
    document.getElementById("toBanking")!.scrollIntoView();

  }
  toNin() {
    document.getElementById("toNin")!.scrollIntoView();

  }

  getNeighbours() {
    this.userService.getNeighnourhoods().subscribe((data) => {

      if (data.status == 200) {
        this.slides = data.data;
      }
    });
  }

  subscribe() {
    this.router.navigate([''], { queryParams: { subscribed: 'true' } });
  }

  bestNeighbours() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    } else {
      let formData = new FormData();
      // this.userService.profileTeacher().subscribe(daata => {

      formData.append('email', this.bookingForm.value.email);
      formData.append('place', this.bookingForm.value.place);
      formData.append('type', '1');

      formData.append('page', this.env.url+'/london-guide');

      this.userService.bestNeighbours(formData).subscribe((data) => {

        if (data.status == 200) {
          this.flag = true;

          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: "#FF5700"
          }).then((result) => {
            window.location.reload();

          });


        }
      });
    }
  }

  sendMessage() {
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    } else {
      let formData = new FormData();
      // this.userService.profileTeacher().subscribe(daata => {

      formData.append('email', this.bookingForm.value.email);
      formData.append('place', this.bookingForm.value.place);
      formData.append('type', '2');

      formData.append('page',  this.env.url+'/london-guide');

      this.userService.bestNeighbours(formData).subscribe((data) => {

        if (data.status == 200) {
          this.flag = true;


          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: "#FF5700"
          }).then((result) => {


            window.location.reload();

          });


        }
      });
    }
  }

  checklistSubmit() {
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.checklistForm.invalid) {
      return;
    } else {
      let formData = new FormData();
      // this.userService.profileTeacher().subscribe(daata => {

      formData.append('email', this.checklistForm.value.email);


      formData.append('page', this.env.url);

      this.userService.checklist(formData).subscribe((data) => {

        if (data.status == 200) {
          this.flag = true;

          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonText: 'ok',
            confirmButtonColor: "#FF5700"
          }).then((result) => {

            window.location.reload();
         
          });


        }
      });
    }
  }

  next() {
    this.slickModal.slickNext();
  }
  previous() {
    this.slickModal.slickPrev();
  }
  next1() {
    this.slickModal1.slickNext();
  }
  previous1() {
    this.slickModal1.slickPrev();
  }
  next2() {
    this.slickModal2.slickNext();
  }
  previous2() {
    this.slickModal2.slickPrev();
  }
}

