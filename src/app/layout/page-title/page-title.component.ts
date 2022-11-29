import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
declare  var $:  any;
@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
role_id:any;
token =localStorage.getItem('currentUser');
  profile_steps: any;
 dropdown= false;
 dropdown1= false;

  status: boolean = false;
  //Sidebar opne
  clickEvent(){
      this.status = true;       
  }
  //Sidebar close
  clickEvent2()
  {
    this.status = false; 
  }
  constructor(
    public router: Router,private userService: UserService) { }

  ngOnInit() { 
   
  }
  
  showDropdown(){
    if(this.dropdown== false){
      this.dropdown=true;

    }else{
      this.dropdown=false;

    }
  }
  showDropdown1(){
    if(this.dropdown1== false){
      this.dropdown1=true;

    }else{
      this.dropdown1=false;

    }
  }
}
