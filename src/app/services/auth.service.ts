import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/users';
import { Observable, BehaviorSubject, config } from 'rxjs';
const authUrl = 'https://my-json-server.typicode.com/lobnazakaria/fake/login';
@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(body) {
        return this.http.post<any>(authUrl, body).pipe(tap(
            user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                  }
                return user;
            }
        ));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    private save_token(data) {
        if (data.success) {
            localStorage.setItem('token', data.token);
            return;
        }
    }
}
