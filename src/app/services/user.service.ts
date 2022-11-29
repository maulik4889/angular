import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ISocialLoginData } from '../models/user';
import {
  Observable,
  Subject
} from 'rxjs';

import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
 import * as _ from 'lodash';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {
  }


  private customSubject = new Subject<any>();
  private customSubject1 = new Subject<any>();
  private customSubject2 = new Subject<any>();

  customObservable = this.customSubject.asObservable();
  customObservable1 = this.customSubject1.asObservable();
  customObservable2 = this.customSubject2.asObservable();

  callComponentMethod(value: any) {
    this.customSubject.next(value);
  }
  callComponentMethod1(value: any) {
    this.customSubject1.next(value);
  }
  callComponentMethod2(value: any) {
    this.customSubject2.next(value);
  }


  
  login(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/user/login`, user).pipe(map((userDt: any) => {
      // login successful if there's a jwt token in the response
      if (userDt && userDt.user_token) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('image');
        localStorage.removeItem('profile_steps');
        localStorage.removeItem('role');
        localStorage.removeItem('send_id');
        localStorage.setItem('currentUser', JSON.stringify({ user_token: userDt.user_token, status: userDt.status }));
        localStorage.setItem('profile_steps', userDt.profile_steps);
        localStorage.setItem('image', userDt.profile_image);
        localStorage.setItem('role', userDt.role_id);
        localStorage.setItem('send_id', userDt.id);

      }
      return userDt;
    }));
  }
  verifyUser(formData: any): Observable<any> {
    let url = baseUrl.concat('/api/user/verifyUser');
     return this.http.post(url, formData).pipe(
        map(response => response)
       );
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/user/signUp`, user);
  }

  // user verifcation after registration
  Userverfication(verifytoken: string): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/verify`, { 'verification_token': verifytoken });
  }

  forgotPassword(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/user/forgotPassword`, user);
  }

  resetPassword(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/reset-password`, user);
  }

  requestNewSkills(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/user/requestNewSkills`, user);
  }
  requestNewSubjects(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/home/requestNewSubjects`, user);
  }
  contactUs(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/user/contactUs`, user);
  }

  resendLink(email: string) {
    return this.http.post(baseUrl + `/api/user/resendVerification`, { 'email': email });
  }
  logout() {
    return this.http.post<User>(baseUrl + `/api/user/logout`, '').pipe(map(response => {
      if (response && (response.status === 200)) {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('image');
        localStorage.removeItem('profile_steps');
        localStorage.removeItem('role_id');
        localStorage.removeItem('send_id');

      }
      return response;
    }));
  }

  isAuthenticated(): boolean {

    const auth_token: any = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (auth_token.user_token && auth_token.user_token !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  // get user profile
  getCategories() {
    return this.http.get<User>(baseUrl + `/api/user/getCategories`);
  }

  // saveProfile(formData:any): Observable<any> {
  //   let url = baseUrl.concat('/api/user/saveProfile');
  //   return this.http.post(url, formData);
  // }


  verifyOtp(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/verify-otp`, user);
  }

  arrayObjectToString = function (obj: any) {
    const results: string[] = [];
    _.forOwn(obj, (value, key) => {
      results.push(`${key}=${encodeURIComponent(value)}`);
    });
    return results.join('&');
  };


  // get address code
  getSubjects() {
    return this.http.get<User>(baseUrl + `/api/lesson/getSubjects`);
  }

  uploadImage(formData:any): Observable<any> {
    let url = baseUrl.concat('/api/user/uploadProfileImage');
    return this.http.post(url, formData).pipe(
      map(response => response)
    )
  }

  userSocialLogin(user: ISocialLoginData) {

    return this.http.post<User>(baseUrl + `/api/user/socialLogin`, user).pipe(map((userDt: any) => {
      // login successful if there's a jwt token in the response
      if (userDt && userDt.user_token) {

        //   localStorage.setItem('currentUser', JSON.stringify({ user_token: userDt.user_token, status: userDt.status }));
        //   localStorage.setItem('profile_steps', userDt.profile_steps);
        //   localStorage.setItem('image', userDt.profile_image);
        //  localStorage.setItem('role', userDt.role_id);
        //   localStorage.setItem('send_id', userDt.id);


        localStorage.removeItem('currentUser');
        localStorage.removeItem('image');
        localStorage.removeItem('profile_steps');
        localStorage.removeItem('role_id');
        localStorage.removeItem('send_id');
        localStorage.setItem('currentUser', JSON.stringify({ user_token: userDt.user_token, status: userDt.status }));
        localStorage.setItem('profile_steps', userDt.profile_steps);
        localStorage.setItem('image', userDt.profile_image);
        localStorage.setItem('role', userDt.role_id);
        localStorage.setItem('send_id', userDt.id);
      }
      return userDt;
    }));

  }

  





  changeEmail(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/settings/changeEmail`, user);
  }
  changePassword(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + `/api/settings/changePassword`, user);
  }


  
 
  getPages(queryString:any) {
    return this.http.get<User>(baseUrl + `/api/user/getPages`, {
      params: {
        meta_key: queryString,
      }
    });
  }
  


  
 

 

  
  
 

 
  getBlogs(page:any) {
    return this.http.get<User>(baseUrl + `/api/user/getBlogs`, {
      params: {
       
        page: page
      }
    });
  }

  blogDetail(queryString: any): Observable<any> {
    return this.http.get<User>(baseUrl + `/api/user/blogDetail?title=` + queryString);

  }


  
  checklist(data:any):Observable<any>{
    let url = baseUrl.concat('/api/home/checklist');
    return this.http.post(url, data).pipe(
      map(response => response)
    )
  }
  
  bookingEnquiry(data:any):Observable<any>{
    let url = baseUrl.concat('/api/home/bookingEnquiry');
    return this.http.post(url, data).pipe(
      map(response => response)
    )
  }
  getNeighnourhoods(): Observable<any> {
    return this.http.get<User>(baseUrl + `/api/home/getNeighnourhoods`);
  }
  bestNeighbours(data:any):Observable<any>{
    let url = baseUrl.concat('/api/home/bestNeighbours');
    return this.http.post(url, data).pipe(
      map(response => response)
    )
  }
  getHeaderNotification() {
    return this.http.get<User>(baseUrl + `/api/settings/getHeaderNotification`);
  }

 getChecklistTasks(){
  return this.http.get<User>(baseUrl + `/api/home/getChecklistTasks`);

 }

 //select checlist 

 addTaskToUserChecklist(data:any):Observable<any>{
  let url = baseUrl.concat('/api/home/addTaskToUserChecklist');
  return this.http.post(url, data).pipe(
    map(response => response)
  )
}

getPercentage(){
  return this.http.get<User>(baseUrl + `/api/home/getTaskPercentage`);

 }

 getUserNonSelectedCheckList(){
  return this.http.get<User>(baseUrl + `/api/home/getUserNonSelectedCheckList`);
 }

 saveProfile(data:any):Observable<any>{
  let url = baseUrl.concat('/api/user/saveProfile');
  return this.http.post(url, data).pipe(
    map(response => response)
  )
}
getProfile(){
  return this.http.get<User>(baseUrl + `/api/user/getProfile`);

 }

}
