import { Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
declare var $: any;
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sticky = false;
  public scroll:any;
  public questionTitle: any = '';
  // sideMenu = false;
public token=localStorage.getItem('currentUser');

  constructor(
    private renderer: Renderer2,
     public router: Router,
    private userService: UserService, 
  ) {
    
  }

  ngOnInit() {

    this.renderer.listen(window, 'scroll', ($event) => {
      this.scroll = (window.scrollY );
   });
   this.questionTitle = 'Already have an account?';
  }

  close(){ 
    var navMain = $(".navbar-collapse");

    navMain.on("click", "a", null, function () {
        navMain.collapse('hide');
    });
  }


}