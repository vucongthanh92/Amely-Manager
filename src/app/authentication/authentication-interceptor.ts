import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { CustomService } from '../services/custom.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private token;
    constructor(
        private customService: CustomService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('token');
        if (this.token) {
            request = request.clone({
                params: request.params.append('user_token', this.token)
            });
        }
        return next.handle(request).do((response) => {
            if (response instanceof HttpResponse) { 
                this.customService.checkError(response.body);
            }
        });
    }
}
