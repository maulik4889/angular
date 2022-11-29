import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {

  
  notifications = [];
  modalRef!: BsModalRef;

  dataRefresher: any;
  dataRefresher1: any;
 
  dropdown=false;
  dropdown1=false;

  // dataRefresher: NodeJS.Timer;
  constructor( public router: Router,
    private userService: UserService, public route: ActivatedRoute,public modalService: BsModalService ) { }
  public image:any;
  public name:any;
  url:any;
  unread_noti = 0;


  ngOnInit() {
    // this.unreadMessage();
  //  this.getNotifications();
  this.getProfile();
    this.userService.customObservable.subscribe((res) => {
      if (res) {
        this.image = res;
      }
    })
    

  }
  ngOnDestroy() {
    if (this.dataRefresher) {
      clearInterval(this.dataRefresher);
    }
  }
  
  
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout'
    }).then(result => {
      if (result.value === true) {
        this.userService.logout().subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/dashboard']);
            }

          },
          error => {
            Swal.fire({
              title: error.error.message,
              icon: 'error',
              confirmButtonText: 'ok'
            });
          }
        );

      }
    });
  }


  getProfile() {

    this.userService.getProfile().subscribe(data => {
      if (data.status == 200) {
        this.image=data.data.image;
        this.name=data.data.name;



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

      
      }
    })
  }

  getNotifications() {
   
      this.userService.getHeaderNotification().subscribe(data => {
        if (data.status == 200) {

          this.notifications = data.data;
        }
      })
   


  }


  showDropdown(){
    if(this.dropdown== false){
      this.dropdown=true;

      
    }else{
      this.dropdown=false;

    }
  }

  openSidebar(sideBar: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      sideBar,
      Object.assign({}, { class: 'gray modal-sm ' })
    );
  }

  closePopup(path:any){
    this.modalRef.hide();
    this.router.navigate(['/'+path]);

  }
  showDropdown1(){
    if(this.dropdown1== false){
      this.dropdown1=true;

    }else{
      this.dropdown1=false;

    }
  }
}
