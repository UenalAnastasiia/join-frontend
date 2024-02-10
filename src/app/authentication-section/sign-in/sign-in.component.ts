import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, updateProfile } from "firebase/auth";
import { Firestore, doc, setDoc, collectionData } from '@angular/fire/firestore';
import { collection, addDoc } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formReg: FormGroup;
  error: string;
  user = new User();
  userNameExist: boolean;

  constructor(public service: AuthenticationService, private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl()
    });
  }

  onSubmit() {
    const userCollection = collection(this.firestore, 'users');
    let allUsers$ = collectionData(userCollection, {});

    allUsers$.subscribe((data: any) => {
      this.userNameExist = data.some((data) => { return data.displayName === this.formReg.get('name').value });
      if (!this.userNameExist) {
        this.registerUser();
      }
    });
  }


  registerUser() {
    this.service.register(this.formReg.value)
      .then(() => {
        this.updateUser();
      })
      .catch(error => this.error = error)
  }


  async updateUser() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: this.formReg.get('name').value,
      photoURL: 'assets/img/profile.png'
    }).then(() => {
      this.createUserInDB();
      window.location.href = '/login'
    }).catch((error) => {
      this.error = error
    });
  }


  async createUserInDB() {
    const docRef = await addDoc(collection(this.firestore, "users"), this.user.toJSON());
    this.user.uid = docRef.id;
    this.user.displayName = this.formReg.get('name').value;
    this.user.photoURL = 'assets/img/profile.png';
    this.user.email = this.formReg.get('email').value;
    await setDoc(doc(this.firestore, "users", this.user.uid), this.user.toJSON());
  }

}