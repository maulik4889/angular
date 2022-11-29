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
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  public total: any;
  public page:any = 1;
  public limit: Number = 1;
  blogsData= [];
  env = environment;

  public loading = true;
  blog: any;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,private titleService: Title, private meta: Meta
  ) { }





  ngOnInit() {
    this.blogDetail();
   

  }
blogDetail(){
 
 const url = this.router.url.replace('/blogs/', '');


    this.userService.blogDetail(url).subscribe(data => {
      if (data.status == 200) {
        this.blog = data.data;
        this.titleService.setTitle(this.blog.tag);
        this.meta.updateTag({ name: 'description', content: this.blog.tag_description});
        this.loading= false;
      }
    }, error=> {
      this.loading=false;
    })
  }



}



