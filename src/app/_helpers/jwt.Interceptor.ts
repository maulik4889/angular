import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService, private injector: Injector,
    ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        const currentUser: any = JSON.parse(localStorage.getItem('currentUser') || '{}')
        if (currentUser && currentUser.user_token ) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.user_token}`
                }
            });
        }
        
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
        }, error => {
            if (error.status == 401) {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
                return;
            }
        }),
        );
    }

}
