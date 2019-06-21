import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role} from '../interfaces/role';
import { User} from '../interfaces/users';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { id: 1, username: 'admin', password: 'admin', role: Role.Admin },
            { id: 2, username: 'user', password: 'user', role: Role.User }
        ];
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        return of (null).pipe(mergeMap(() => {
            if (request.url.endsWith('/fake/login') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) {return error('Username or password is incorrect'); }
                return ok({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            //     if (!isLoggedIn) {
            //         return unauthorised();
            //     }
            //     // get id from request url
            //     const urlParts = request.url.split('/');
            //     // tslint:disable-next-line:prefer-const
            //     // tslint:disable-next-line:radix
            //     const id = parseInt(urlParts[urlParts.length - 1]);
            //     const currentUser = users.find(x => x.role === role);
            //     if (id !== currentUser.id && role !== Role.Admin) {return unauthorised(); }

            //     const user = users.find(x => x.id === id);
            //     return ok(user);
            // }
            // if (request.url.endsWith('/users') && request.method === 'GET') {
            //     if (role !== Role.Admin) {return unauthorised(); }
            //     return ok(users);
            // }
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
