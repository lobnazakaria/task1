import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/users';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/role';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isadmin: boolean;
  data: any;
    currentUser: User;
    settings = {
      pager: {
        display: true,
        perPage: 5,
      },
      actions: {
        //  position : 'right',
      },
      add: {
        addButtonContent: '<i class="fas fa-plus"></i>',
        createButtonContent: '<i class="fas fa-check"></i>',
        cancelButtonContent: '<i class="fas fa-times"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="fas fa-edit"></i>',
        saveButtonContent: '<i class="fas fa-check"></i>',
        cancelButtonContent: '<i class="fas fa-times"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
        confirmDelete: true,
      },
        columns: {
          id: {
            title: 'ID',
            editable: 'false'
          },
          name: {
            title: 'Name'
          },
          email: {
            title: 'Email'
          },
          phone: {
            title: 'Phone'
          },
          Status: {
            title: 'Status',
            editable: 'false'
          }
        }
      };
    constructor(  private router: Router, private authService: AuthService,
                  private userServ: UserService, private spinner: NgxSpinnerService) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit() {
     this.spinner.show(undefined, { fullScreen: true });
     this.userServ.getAll().subscribe( data => {
        this.data = (data);
        console.log(this.data);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
       });
      });
     this.isAdmin();
     if (!this.isadmin) {
      this.settings.actions = false;
      delete this.settings.add;
      delete this.settings.edit;
      delete this.settings.delete;
     }
    }
    isAdmin() {
        if (this.currentUser && this.currentUser.role === Role.Admin) {
          this.isadmin = true;
        } else {
          this.isadmin = false;
        }
    }
    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
        event.newData.Status = 'soft-deleted';
        this.userServ.update(event.newData, event.data.id);
      } else {
        event.confirm.reject();
      }
    }
    onAdd(event) {
      event.confirm.resolve(event.newData);
      // console.log(event.newData);
      this.userServ.add(event.newData).subscribe(res => {});
    }
    onEdit(event) {
      if (window.confirm('Are you sure you want to edit?')) {
      event.confirm.resolve(event.newData);
      event.newData.id = event.data.id;
      event.newData.Status = event.data.Status;
      this.userServ.update(event.newData, event.data.id).subscribe(res => {});
      } else {
        event.confirm.reject();
      }
    }
}
