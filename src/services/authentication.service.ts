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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName: string;
  userImg: any;
  userEmail: string;
  errorResetMessage: any;

  constructor(private auth: Auth, private messageService: SnackBarService, public dialog: MatDialog, private http: HttpClient, public shared: SharedService) { }


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
    return signOut(this.auth);
  }


  async getLoggedUser() {
    let JSONdata = JSON.parse(localStorage.getItem("token"));
    if (JSONdata) {
      let loggedUser = await this.shared.loadUserFromAPI(JSONdata.id);
      this.userName = loggedUser[0]['username'];
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
