import { Injectable } from '@angular/core';
import { User, Role } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
    login(user: any): Observable<any> {
        return this.http.post<any>('/api/login', user)
        .pipe(
        tap(res => {
            this.setSession(res);
        }),
        shareReplay(),
        catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        error.error.message);
    }
    private setSession(authResult) {
        localStorage.setItem('access_token', authResult);
    }
    logout() {
        localStorage.removeItem('access_token');
    }
    public isLoggedIn() {
        const token = localStorage.getItem('access_token');
        if (!token) { return false; }
        return !this.jwtHelper.isTokenExpired(token);
    }
 
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    get currentUserId() {
        const token = localStorage.getItem('access_token');
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.id;
    }
    public hasPrivilege(roles: Role[]) {
        if (roles === undefined || roles.length === 0) {return true; }
        const token = localStorage.getItem('access_token');
        const decodedToken = this.jwtHelper.decodeToken(token);
        return roles.includes(decodedToken.role);
    }
    public getValidRoles(): Role[] {
        return [Role.Admin, Role.Regular];
    }
}