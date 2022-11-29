import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Title,Meta } from "@angular/platform-browser";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';

import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-primary-info',
  templateUrl: './primary-info.component.html',
  styleUrls: ['./primary-info.component.scss'],
  providers: [TitleCasePipe]

})

export class PrimaryInfoComponent implements OnInit {

  profileSetup!: FormGroup;
  submitted = false;
  hideShow = true;
  urls = [];
 

 
  profile_complete = 0;
  address?: String;
loading=false;

  image_msg='';

  profile_steps: any;
  showImage = false;
  bank_verified: any;
  size: any;
  average_cost = 5;
  modalRef!: BsModalRef;
  fileName: any;
  documentFile: any;
  currency: any;
  subscription_id: any;

  public choice = 1;
  countries = [];
  cities = [];
name:any;
  invalid = [];
  complete_profile:boolean = true
  public queryData=this.route.snapshot.queryParamMap.get('complete');
  fieldname: any;
  image: any;
  newDob:any;
  message!: string;
  myDateValue = new Date();

  constructor( private meta: Meta,private route: ActivatedRoute, private http: HttpClient, public modalService: BsModalService
    , private titleService: Title,private titlecasePipe: TitleCasePipe, public datepipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.queryData = this.route.snapshot.queryParamMap.get('complete');

    this.titleService.setTitle("Matutto | Create Your Profile");
    this.meta.updateTag({ name: 'description', content: "Create your profile on Matutto to start listing your online classes and monetising your skills. Signing up takes as little as 2 minutes and it's free." });
   // this.getProfile();

    // this.updatebank();
    

    
    this.profileSetup = this.formBuilder.group({

      
        dob: ['',[Validators.required]],

      // interest: ['', [Validators.required]],
      nationality: ['',[Validators.required]],
      moving_reason: ['',[Validators.required]],

    
    })


this.getProfile();

  }

  
  
  
  get formField() {
    return this.profileSetup.controls;
  }

  


  getProfile() {
    // this.loading = true;

    this.userService.getProfile().subscribe(data => {
      if (data.status == 200) {
        this.image=data.data.image;



        //console.log('aaaa',this.subjects, data.data.profile_steps);
        // if (data.data.user_categories == 0 && data.data.profile_steps == 1) {
        //   this.flag = 0;
        // } else if (data.data.user_categories == 0 && data.data.profile_steps == 2) {
        //   this.flag = 1;

        //   this.clickOnButton(1);
        //} else {
         // this.flag = 2;
         // this.getCities(data.data.country);


        //}
        //this.profileSetup.controls['country'].setValue(data.data.country);

        this.loading = false;
      
        // this.profileSetup.patchValue(data.data);
      }
    })
  }



 
    fileUpload(event:any='') {
      this.showImage = true;
  
      const formData = new FormData();
      this.urls = [];
      let files = event.target.files;
      this.size = event.target.files[0].size;
      if(this.size >10000000 && this.size != undefined){
        Swal.fire({
          title: 'Unable to upload. File over 10MB',
          icon: 'error',
          confirmButtonText: 'ok',
          confirmButtonColor: "#FF5700"
        }).then((result) => {
        });
  
      }
      else {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            // this.urls.push(e.target.result);
          }
          reader.readAsDataURL(file);
          formData.append('image', file, file.name);
          this.userService.uploadImage(formData).subscribe(data => {
            if (data) {
              this.image = data.image.replace('/thumb','')
              this.showImage = false;
              //this.getTeacherProfile();

  
              // this.userService.callComponentMethod(data.image);
  
            }
          })
        }
      }
  
    }

    
    // this.imageChangedEvent = event;
    // let files = event.target.files[0];
    // let files1 = event.target.files;

    // if (event.target.files) {
    //   this.feedFile = event.target.files[0].name;
    //   this.fileName = event.target.files[0];
    //   this.size = event.target.files[0].size;

    // }
    // this.documentFile = this.feedFile;
    // this.split = this.feedFile.split('.');
    // this.urls = [];

    // if (files1) {
    //   this.showImage = true;
    //   for (let file of files1) {
    //     let reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       this.urls.push(e.target.result);
    //     }
    //     reader.readAsDataURL(file);
    //   }
    
    
   
    // if (this.split[this.split.length - 1] != 'mp4') {
    //   this.modalRef = this.modalService.show(
    //     template,
    //     Object.assign({}, { class: 'gray modal-lg' })
    //   );
    // }
  

  
  

  // // imageCropped(event: ImageCroppedEvent) {
  // //   if (this.split[this.split.length - 1] == 'jpg'|| this.split[this.split.length - 1] == 'PNG' || this.split[this.split.length - 1] == 'JPG' ||  this.split[this.split.length - 1] == 'JPEG' ||this.split[this.split.length - 1] == 'png' || this.split[this.split.length - 1] == 'jpeg') {
  // //     this.fdfd = event;
  // //     this.croppedImage = this.dataURItoBlob(event.base64);

  // //   }

  // // }
 



  onSubmit() {

    
      // let newInterest = [];
      // let interests = [];
      // newInterest = this.profileSetup.value.interest.map(interests => interests.id)
      // newInterest = [...Array.from(new Set(newInterest))];
      if (this.profileSetup.invalid) {



     
        this.submitted = true;
        
    
        return;
      }

      

    
  
 
    else {

      this.submitted = true;
     

      // let newInterest = [];
      // let interests = [];
      // newInterest = this.profileSetup.value.interest.map(interests => interests.id)
      // newInterest = [...Array.from(new Set(newInterest))];
   
        this.loading = true;

        this.newDob = this.datepipe.transform(this.myDateValue, 'yyyy-MM-dd');

        let formData = new FormData();
        // this.userService.profileTeacher().subscribe(daata => {

          //formData.append('name', this.profileSetup.value.name);
      

        formData.append('dob', this.newDob);
        formData.append('moving_reason', this.profileSetup.value.moving_reason);

        formData.append('nationality', this.profileSetup.value.nationality);
       
        this.userService.saveProfile(formData).subscribe((data) => {
        
          if (data.status == 200) {
            this.loading = false;

         
          
              this.message = 'Changes saved';
            Swal.fire({
              title: this.message,
              icon: 'success',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"
            }).then((result) => {

              if (result.value) {
                // this.userService.profileTeacher().subscribe((data) => {

                //   if (data.data.region == "Europe" ) {
                    this.router.navigate(['/dashboard']);

                //   } else {
                //     this.router.navigate(['/ready']);

                //   }
                // });                // if ((this.profile_steps == 1 ||this.profile_steps == 2) && this.subscription_id==0) {
                //   this.router.navigate(['/plan']);
                // } else {
                //}
              }
            });
          

          }else {
            this.loading = false;

            Swal.fire({
              title: data.message,
              icon: 'error',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"
            }).then((result) => {
              if (result.value) {
              }
            });
          }
        });

      
    }

  }
 

}

