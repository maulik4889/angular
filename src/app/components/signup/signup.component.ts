import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { UserRegister } from '../../models/user';
import { ISocialLoginData } from '../../models/user';
import { Title, Meta } from "@angular/platform-browser";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public questionTitle: any = '';
  showHidePass = "password";
  passcontent = "Show";
  signup_success= false;
  role!: number;
  flag: boolean = false;
  ngvalue=true;
  signupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  }); 
  submitted = false;
  show!: boolean;
  loading=false;
  private loggedIn!: boolean;

  constructor(private titleService: Title, private meta: Meta, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Sign Up");
    this.meta.updateTag({ name: 'description', content: 'Sign up to Matutto, the platform for Expats. Feel ready to move abroad with information shared by other Expats on the platform.' });
    this.questionTitle = 'Don"t have an account ?';


  this.signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,
    Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&()*+,-./:;<=>?@[^_`{|}~]).*$')]],
    name: ['', [Validators.required]],

    
    // type: [''],

  });

    
  }
  get formInputs(): { [key: string]: AbstractControl } { return this.signupForm.controls; }
  
  signup() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      
      return;
    } else {
      this.loading = true;
      this.userService.register(this.signupForm.value)
        .subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.loading = false;
              this.signup_success= true;

            } else {
              this.loading = false;
             Swal.fire({
                title: data.message,
                icon: 'error',
                confirmButtonText: 'ok',
                confirmButtonColor: "#FF5700"

              }).then((result) => {
              });
            }
          },
          error => {
            this.loading = false;
          });
    }
  }


 


  PasswordShow() {
    this.showHidePass = (this.showHidePass == "password") ? (this.showHidePass = "text") : (this.showHidePass = "password");
    this.passcontent = (this.passcontent == "Show") ? (this.passcontent = "Hide") : (this.passcontent = "Show");
  }
  
  // apiConnection(data) {
  //   this.userPostData.email = data.email;
  //   this.userPostData.name = data.name;
  //   this.userPostData.signup_type = data.provider;
  //   this.userPostData.image = data.photoUrl;
  //   this.userPostData.social_id = data.id;
  //   this.userPostData.device_type = 'WEB';
  //   this.userPostData.type = this.signupForm.value.type;
  //   this.userService.userSocialLogin(this.userPostData)
  //     .subscribe((res) => {
  //       this.datas = res;
  //   //    console.log(res,'sjdkasjkdjaksdjkajs');
  //       if (res.status === 200) {
  //         if (this.datas.role_id == 2 && this.datas.profile_steps == 1) {
  //           // this.router.navigate(['/profileinfo'], { queryParams: { signup: 'complete' } });

  //           // this.router.navigate(['/profileinfo']);
  //         } if (this.datas.role_id == 3 && this.datas.profile_steps == 1) {
  //           // this.router.navigate(['/profilesetup']);
  //         } if (this.datas.profile_steps == 2) {
  //           // this.router.navigate(['/dashboard']);
  //         }
  //       } else {
  //        Swal.fire({
  //           title: res.message,
  //           type: 'error',
  //           confirmButtonText: 'ok',
  //           confirmButtonColor: "#FF5700"

  //         }).then((result) => {
  //           if (result.value) {
  //           }
  //         });
  //       }
  //     });
  // }
  // signInWithFB(): void {
   
  //     // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
  //       this.apiConnection(userData);
  //     });
    
  // }

  // signInWithGoogle(): void {
    
    
  
  
  //     // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
  //       this.apiConnection(userData);
  //     });
  //   }
  
}





