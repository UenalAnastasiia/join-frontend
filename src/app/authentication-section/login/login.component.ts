import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getAuth, signInAnonymously } from "firebase/auth";
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  error: string;
  username: string = '';
  password: string = '';


  constructor(public auth: AuthenticationService, public shared: SharedService, public dialog: MatDialog, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


  ngOnInit(): void {
  }


  async loginUser() {
    try {
      let resp: any = await this.auth.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', JSON.stringify({token: resp['token'], id: resp['user_id']}));
      window.location.href = '/summary';
    } catch(e) {
      this.error = e;
      console.error('Error in fetch token: ', e);    
    }
  }


  signInWithGoogle() {
    this.auth.loginWithGoogle()
      .then(() => {
        //this.auth.getLoggedUser();
        window.location.href = '/summary';
      })
      .catch(error => this.error = error);
  }


  guestLogin() {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        window.location.href = '/summary';
      })
      .catch((error) => {
        this.error = error;
      });
  }


  openDialogResetPassword() {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showResetPassword();
  }
}