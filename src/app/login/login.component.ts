import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
        if (this.authService.currentUserValue) {
            console.log('logged in');
        }
     }
    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    get f() { return this.loginForm.controls; }
    login() {
        this.submitted = true;
        // tslint:disable-next-line:no-debugger
        if (this.loginForm.invalid) {
            if (this.f.password.errors) {
                console.log(this.f.password.errors);
            }
            return;
        }
        // tslint:disable-next-line:no-debugger
        const val = this.loginForm.value;
        this.loading = true;
        if (val.username && val.password) {
            this.authService.login(val).pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
        }
    }
}
