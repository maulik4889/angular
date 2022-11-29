import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { UserRegister } from '../../models/user';
import { ISocialLoginData } from '../../models/user';
import { Title, Meta } from "@angular/platform-browser";


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  // category_tasks=[{title:''},{tasks:[{task:'',id:1,user_task:{id:''}}]}];
  category_tasks : any[] = [];
  // loading= true;
  flag:any;
  constructor(private titleService: Title, private meta: Meta, private formBuilder: FormBuilder, 
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.titleService.setTitle("Matutto | Checklist");
    this.meta.updateTag({ name: 'description', content: 'Sign up to Matutto to start hosting online classes and earning teaching online. Or sign up as a User to book online classes on any subject with peace of mind.' });
// alert(this.router.url.split("/") );
this.getChecklistTasks();

  }

 
  getChecklistTasks() {
    this.userService.getChecklistTasks().subscribe((data) => {

      if (data.status == 200) {
        this.category_tasks = data.data;
      }
    });
  }


  selectChecklist(id:any){
    this.userService.addTaskToUserChecklist({task_id:id}).subscribe((data) => {
        if(this.flag==false){
          this.flag=true;
        }
        this.getChecklistTasks();

      
    }, error => {

    });
  }

 
}





