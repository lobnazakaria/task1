import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/users';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Role } from './interfaces/role';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
  }
}


