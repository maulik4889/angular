import { NgModule} from '@angular/core';
import {  CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from './page-title/page-title.component';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
 
    FormsModule
  
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent,
    PageTitleComponent,
    CommonModule

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent,
    PageTitleComponent,
    
    
  ],

})
export class LayoutModule { }
