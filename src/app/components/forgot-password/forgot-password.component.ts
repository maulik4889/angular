import { Component, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Title, Meta } from "@angular/platform-browser";

import Swal from 'sweetalert2';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  submitted = false;




  forgotPasswordForm!: FormGroup;
  msgType: any;



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2, private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Forgot Password");
    this.meta.updateTag({ name: 'description', content: 'Login to your Matutto account to start monetising your skills as Host. Login as a User to start booking classes on any subject with safe payments and Zoom calls.' });

    
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get formInputs() { return this.forgotPasswordForm.controls; }


  forgotPasswordSubmit() {
    this.submitted = true;
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

  

}




