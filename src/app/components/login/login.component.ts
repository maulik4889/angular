import { Component, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Title, Meta } from "@angular/platform-browser";

import Swal from 'sweetalert2';
import { UserLogin, ISocialLoginData } from '../../models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, UserLogin {

  

  loginform!: FormGroup;
  submitted = false;
  submitted1 = false;

  email!: string;
  password!: string;
  errormsg!: string;
  show!: boolean;
  public datas: any;



  forgotPasswordForm!: FormGroup;
  msgType: any;
  showHidePass = "password";
  passcontent = "Show";

  loggedIn!: boolean;
  public userPostData: ISocialLoginData = {} as ISocialLoginData;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2,  private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Login");
    this.meta.updateTag({ name: 'description', content: 'Login to Matutto, the platform for Expats. Feel ready to move abroad with information shared by other Expats on the platform.' });

    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get formInputs(): { [key: string]: AbstractControl } { return this.loginform.controls; }


  loginformSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginform.invalid) {
      return;
    } else {

      this.userService.login(this.loginform.value)
        .subscribe(
          (data: any) => {
            if (data.status === 200) {
              //this.localStorage.setItem('image', data.profile_image);
              localStorage.setItem('role_id', data.role_id);

if ( data.profile_steps == 1) {
              //   this.router.navigate(['/profileinfo']);
                 this.router.navigate(['/create-profile']);
}else{
  this.router.navigate(['/dashboard']);

}

              // if (data.role_id == 2 && data.profile_steps == 1) {
              //   this.router.navigate(['/profileinfo']);
              // } else if (data.role_id == 3 && data.profile_steps == 1) {
              //   this.router.navigate(['/profilesetup']);
              // // } else if (data.role_id == 2 && data.profile_steps == 2 && data.subscription_id !=''  && data.bank_verified=='0') {
    
              // //   this.router.navigate(['/addbank']);
              // }
              // else if (data.role_id == 2 && data.profile_steps == 2 &&data.subscription_id ==''  && data.bank_verified=='0') {
    
              //   this.router.navigate(['/plan']);
              // }
              //  else if (data.role_id==3 && (data.profile_steps == 3 || data.profile_steps == 2)) {
    
              //   this.router.navigate(['/dashboard']);
              // }
              // else if (data.role_id==2  && data.profile_steps == 3) {
    
              //   this.router.navigate(['/dashboard']);
              // }
              // else {
              //   this.router.navigate(['/dashboard']);
    
              // }
            } else {
              if (data.user_unverified) {
                Swal.fire({
                  title: data.message ,
                  icon: 'error',
                  confirmButtonText: 'Resend',
                  showCancelButton: true,
                  confirmButtonColor: "#FF5700",
                }).then((result) => {
                  if (result.value) {
                    this.resendlink(this.loginform.value['email']);
                  } else {
                    this.router.navigate(['/login']);
                  }
                });
              } else {
                Swal.fire({
                  title: data.message,
                  icon: 'error',
                  confirmButtonText: 'ok',
                  confirmButtonColor: "#FF5700"

                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/login']);
                  }
                });
              }
            }
          },
          error => {
            Swal.fire({
              title: error,
              icon: 'error',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"

            }).then((result) => {
            });
          });
    }
  }

  // resend link from here
  resendlink(user_email:any) {
    this.userService.resendLink(user_email)
      .subscribe(
        (data: any) => {
          if (data.status === 200) {
            Swal.fire({
              title: data.message,
              icon: 'success',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"

            }).then((result) => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: data.message,
              icon: 'error',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"

            }).then((result) => {
              window.location.reload();
            });
          }
        },
        error => {
          Swal.fire({
            title: error,
            icon: 'error',
            confirmButtonText: 'ok',
            confirmButtonColor: "#FF5700"

          });
        });
  }

  passwordType() {
    this.show = !this.show;
  }

  forgotPasswordSubmit() {
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      this.userService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.msgType = 'success';
            } else {
              this.msgType = 'error';
            }
            Swal.fire({
              title: data.message,
              icon: this.msgType,
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"

            }).then((result) => {
              if (result.value) {
                // this.modalRef.hide();
                this.router.navigate(['/login']);
              }
            });
          },
          error => {
            Swal.fire({
              title: error,
              icon: 'error',
              confirmButtonText: 'ok',
              confirmButtonColor: "#FF5700"

            });
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
  //   this.userPostData.type = '';

  //   this.userService.userSocialLogin(this.userPostData)
  //     .subscribe((res) => {
  //       this.datas = res;
  //       if (res.status === 200) {
       

  //         // if (this.datas.role_id == 2 && this.datas.profile_steps == 1) {
  //         //   this.router.navigate(['/profileinfo']);
  //         // } else if (this.datas == 3 && this.datas.profile_steps == 1) {
  //         //   this.router.navigate(['/profilesetup']);
  //         // // } else if (data.role_id == 2 && data.profile_steps == 2 && data.subscription_id !=''  && data.bank_verified=='0') {

  //         // //   this.router.navigate(['/addbank']);
  //         // }
  //         // else if (data.role_id == 2 && data.profile_steps == 2 &&data.subscription_id ==''  && data.bank_verified=='0') {

  //         //   this.router.navigate(['/plan']);
  //         // }
  //         //  else if (this.datas.role_id==3 && (this.datas.profile_steps == 3 || this.datas.profile_steps == 2)) {

  //         //   this.router.navigate(['/dashboard']);
  //         // }
  //         // else if (this.datas.role_id==2  &&(this.datas.profile_steps == 3 || this.datas.profile_steps == 2)) {

  //         //   this.router.navigate(['/dashboard']);
  //         // }
  //         // else {
  //         //   this.router.navigate(['/dashboard']);

  //         // }



  //       } else {

  //         Swal.fire({
  //           title: res.message,
  //           type: 'error',
  //           confirmButtonText: 'ok',
  //           confirmButtonColor: "#FF5700"

  //         }).then((result) => {
  //           if (result.value) {
  //             this.router.navigate(['/login']);
  //           }
  //         });
  //       }
  //     });
  // }
  // signInWithFB(): void {
  //   // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
  //     this.apiConnection(userData);
  //   });
  // }

  // signInWithGoogle(): void {
  //   // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
  //     this.apiConnection(userData);
  //   });
  // }
}




