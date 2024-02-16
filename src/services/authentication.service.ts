import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider
} from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { SnackBarService } from './snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName: string;
  firstName: string;
  fullName: string;
  userImg: any;
  userEmail: string;
  errorResetMessage: any;

  constructor(private auth: Auth, private messageService: SnackBarService, public dialog: MatDialog, private http: HttpClient, 
    public shared: SharedService, private userAPI: UsersApiService) { }


  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseURL + '/login/';
    const body = {
      "username": username,
      "password": password
    };
    return lastValueFrom(this.http.post(url, body));
  }


  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  logout() {
    const url = environment.baseURL + '/logout/';
    return lastValueFrom(this.http.get(url));
  }


  async getLoggedUser() {
    let JSONdata = JSON.parse(localStorage.getItem('user'));
    if (JSONdata) {
      let loggedUser = await this.userAPI.loadUserFromAPI(JSONdata.id);
      this.userName = loggedUser[0]['username'];
      this.firstName = loggedUser[0]['first_name'];
      this.fullName = loggedUser[0]['first_name'] + ' ' + loggedUser[0]['last_name'];
      this.userEmail = loggedUser[0]['email'];
      //this.userImg
    } 
  }


  resetPassword(email: any) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.messageService.showSnackMessage('E-Mail was send!');
        setTimeout(() => {
          this.dialog.closeAll();
        }, 1000);

      })
      .catch((error) => {
        this.errorResetMessage = error.message;
      });
  }
}
