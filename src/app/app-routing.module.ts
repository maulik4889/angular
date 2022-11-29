

import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

// layouts
import { UserLayoutComponent } from './app-layout/user-layout/user-layout.component';
import { DubaiLayoutComponent } from './app-layout/dubai-layout/dubai-layout.component';
import { DashboardLayoutComponent } from './app-layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SignupComponent } from './components/signup/signup.component';
 import { LoginComponent } from './components/login/login.component';
 
 import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
 
 import { LondonGuideComponent } from './components/london-guide/london-guide.component';
 import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HealthCareComponent} from './components/health-care/health-care.component'; 
import { MyPlanComponent } from './components/my-plan/my-plan.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
       { path: '',redirectTo:'/', pathMatch: 'full' },
      { path: '', component: HomeComponent  },
      { path: 'termscondition', component: TermsConditionComponent },
      { path: 'privacypolicy', component: PrivacyPolicyComponent },

      { path: 'signup', component: SignupComponent  },
      { path: 'login', component: LoginComponent  },
      //  { path: 'requestaclass', component: RequestaclassComponent },
      { path: 'login', component: LoginComponent  },
      { path: 'forgotpassword', component: ForgotPasswordComponent  },

     { path: 'email-verified/:id', component: EmailVerifiedComponent  },
     { path: 'pricing', component: PricingComponent  },
     
     { path: 'blogs', component: BlogsComponent  },
     { path: 'blogs/:id', component: BlogDetailComponent  },

     { path: 'london-guide', component: LondonGuideComponent  },


            ]
},
      {     path: '', component: DubaiLayoutComponent, children: [


          ],
          
 },


  // dashboard paths
  {
    path: '', component: DashboardLayoutComponent,canActivate: [AuthGuard], children: [
       { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
       { path: 'dashboard', component: DashboardComponent },
       { path: 'checklist', component: ChecklistComponent  },
       {path : 'banking', component: BankInfoComponent },
       {path : 'nationalinsurance', component: NinInfoComponent },
       {path : 'expatadvice', component: ExpatAdviceComponent },
       {path : 'phoneplans', component: PhonePlansComponent },
       {path : 'comingsoon1', component: Comingsoon1Component },
      //  {path : 'healthcare', component: Comingsoon2Component },
       {path : 'discount', component: Comingsoon3Component },
       {path : 'transport', component: Comingsoon3Component },
       {path : 'apps', component: Comingsoon3Component },
       {path : 'meetpeople', component: Comingsoon3Component },
       {path : 'explore', component: Comingsoon3Component },
       {path : 'shopping', component: Comingsoon3Component },

       {path : 'housing', component: HousingComponent },
       {path : 'create-profile', component: PrimaryInfoComponent },
       {path : 'healthcare', component : HealthCareComponent },
       {path : 'myplan', component : MyPlanComponent },

       
    ]
   },

   { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }

export const appRoutingDeclaration = [
  UserLayoutComponent, 
  DubaiLayoutComponent,
  DashboardLayoutComponent,
  HomeComponent,
  TermsConditionComponent,
  PrivacyPolicyComponent,
  SignupComponent,
  LoginComponent,
  LondonGuideComponent,
  DashboardComponent,
  EmailVerifiedComponent,
  PricingComponent,
  ChecklistComponent,
  HousingComponent,
  BlogsComponent,
  BlogDetailComponent,
  PrimaryInfoComponent,
  ForgotPasswordComponent,
  MyPlanComponent
];
