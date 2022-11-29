import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, appRoutingDeclaration } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode } from '@angular/core';

 import { Breakpoints } from '@angular/cdk/layout';
 import { SignupComponent } from './components/signup/signup.component';
 import { LoginComponent } from './components/login/login.component';

 import { SlickCarouselModule } from 'ngx-slick-carousel';
 import { AppComponent } from './app.component';
 import { LayoutModule } from './layout/layout.module';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.Interceptor';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PricingComponent } from './components/pricing/pricing.component';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { ModalModule } from 'ngx-bootstrap/modal';

import { DatePipe, CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BankInfoComponent } from './components/bank-info/bank-info.component';
import { NinInfoComponent } from './components/nin-info/nin-info.component';
import { ExpatAdviceComponent } from './components/expat-advice/expat-advice.component';
import { PhonePlansComponent } from './components/phone-plans/phone-plans.component';
import { Comingsoon1Component } from './components/comingsoon1/comingsoon1.component';
import { Comingsoon2Component } from './components/comingsoon2/comingsoon2.component';
import { Comingsoon3Component } from './components/comingsoon3/comingsoon3.component';
import { HousingComponent } from './components/housing/housing.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { PrimaryInfoComponent } from './components/primary-info/primary-info.component';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HealthCareComponent } from './components/health-care/health-care.component';
import { MyPlanComponent } from './components/my-plan/my-plan.component';

enableProdMode();

// 1: supply a function to create the srcset urls for each breakpoint




@NgModule({

   declarations: [
      AppComponent,
      appRoutingDeclaration,

      HomeComponent,
      TermsConditionComponent,
      PrivacyPolicyComponent,
      SignupComponent,
      LoginComponent,
      PricingComponent,
      ChecklistComponent,
      BankInfoComponent,
      NinInfoComponent,
      ExpatAdviceComponent,
      PhonePlansComponent,
      Comingsoon1Component,
      Comingsoon2Component,
      Comingsoon3Component,
      HousingComponent,
      BlogsComponent,
      BlogDetailComponent,
      PrimaryInfoComponent,
      HealthCareComponent,
      MyPlanComponent
   ],
   imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      AppRoutingModule,
      FormsModule,
      ModalModule.forRoot(),
      MDBBootstrapModule.forRoot(),
      ReactiveFormsModule,
      LayoutModule,
      SlickCarouselModule,
      HttpClientModule,
      NgbModule,
      
      NgxLoadingModule.forRoot({
         animationType: ngxLoadingAnimationTypes.chasingDots,
         backdropBackgroundColour: 'white',
         backdropBorderRadius: '14px',
         primaryColour: 'orange',
         secondaryColour: 'orange',
         tertiaryColour: 'orange',
         fullScreenBackdrop: true
      }),

      NgCircleProgressModule.forRoot({
         // set defaults here
         radius: 100,
         outerStrokeWidth: 20,
         innerStrokeWidth: 10,
         outerStrokeColor: "#78C000",
         innerStrokeColor: "#C7E596",
         animationDuration: 300,
         unitsFontSize:'40',
         titleFontSize:'40',
         showSubtitle:false
      }),
     
      BrowserAnimationsModule,
      //  AdsenseModule.forRoot({
      //adClient: 'ca-pub-2747432908949814',
      //    adSlot: 7259870550,
      //  }),
     
      CommonModule,
      BsDatepickerModule.forRoot()
    




    

   ],
 
   providers: [UserService, AuthGuard, DatePipe,

      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     
      
   ],
   schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],

   bootstrap: [AppComponent]
})




export class AppModule { }
