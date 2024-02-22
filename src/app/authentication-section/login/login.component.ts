import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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


  constructor(public auth: AuthenticationService, public shared: SharedService, public dialog: MatDialog) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


  ngOnInit(): void { }


  loginUser() {
    this.auth.loginWithUsernameAndPassword(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify({token: response['token'], id: response['user_id']}));
      },
      error: (e) => {
        this.error = 'Username or password is wrong!';
      },
      complete: () => {
        window.location.href = '/summary';
      }
    })     
  }


  guestLogin() {
    this.auth.loginWithUsernameAndPassword('Guest', 'test123test123').subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify({token: response['token'], id: response['user_id']}));
      },
      error: (e) => {
        this.error = 'Username or password is wrong!';
      },
      complete: () => {
        window.location.href = '/summary';
      }
    })     
  }
}