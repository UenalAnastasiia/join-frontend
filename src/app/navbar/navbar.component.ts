import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddTaskComponent } from '../task-section/dialog-add-task/dialog-add-task.component';
import { DialogAddContactComponent } from '../contact-section/dialog-add-contact/dialog-add-contact.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DialogSettingsComponent } from '../dialog-settings/dialog-settings.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  btnTop = [
    { name: 'summary', icon: 'pending_actions' },
    { name: 'board', icon: 'dashboard' },
    { name: 'contact', icon: '3p' },
  ];
  currentUser$: Observable<any>;
  currentUser: any = [];

  constructor(public router: Router, public dialog: MatDialog, public auth: AuthenticationService, private firestore: Firestore) { }

  ngOnInit(): void {
    this.auth.getLoggedUser();
  }


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }


  openDialogAddContact() {
    this.dialog.open(DialogAddContactComponent);
  }


  openDialogSettings() {
    this.dialog.open(DialogSettingsComponent);
  }


  logOut() {
      try {
        this.auth.logout();
        localStorage.removeItem('user');
        window.location.href = '/login';
      } catch(e) {
        console.error('Error in Logout: ', e);    
      }
  }
}