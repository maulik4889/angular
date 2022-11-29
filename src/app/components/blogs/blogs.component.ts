import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { Title,Meta } from "@angular/platform-browser";
import { DatePipe } from '@angular/common';

import { environment } from '../../../environments/environment';


declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  public total: any;
  public page:any = 1;
  public limit: Number = 1;
  blogsData:any[]= [];

  public loading = true;
  env = environment;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,private titleService: Title,private meta: Meta
  ) { }





  ngOnInit() {
    this.titleService.setTitle("Matutto | The Blog: Words from the Matutto Team");
    this.meta.updateTag({ name: 'description', content: 'Matutto plans on being at the forefront of ed tech innovation. Discover more of our direction and technology predictions on The Blog.' });
  this.getBlogs(this.page);

  }
getBlogs(page:any){
    this.userService.getBlogs(page).subscribe(data => {
      if (data.status == 200) {
        this.blogsData = data.data.data;
        this.total = data.data.total;
        this.page = data.data.current_page;
        this.limit = data.data.per_page;
        this.loading= false;
      }
    }, error=> {
      this.loading=false;
    })
  }



}



