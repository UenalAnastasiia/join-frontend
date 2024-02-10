import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider
} from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { SnackBarService } from './snack-bar.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName: any;
  userImg: any;
  userEmail: any;
  errorResetMessage: any;

  constructor(private auth: Auth, private messageService: SnackBarService, public dialog: MatDialog) { }


  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  logout() {
    return signOut(this.auth);
  }


  getLoggedUser() {
    const authUser = getAuth();
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userImg = user.photoURL;
        this.userEmail = user.email;
      }
    });
  }


  resetPassword(email: any) {
    console.log('email ', email);

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
