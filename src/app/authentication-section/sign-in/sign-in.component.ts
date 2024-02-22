import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthenticationService } from 'src/services/authentication.service';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { SnackBarService } from 'src/services/snack-bar.service';

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

  constructor(public service: AuthenticationService, private messageService: SnackBarService, public contactsAPI: ContactsApiService) { }

  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      password_repeat: new FormControl(),
      username: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl()
    });
  }

  onSubmit() { 
    this.service.register(this.formReg.value).subscribe({
      next: (response) => {
        this.messageService.showSnackMessage('User created!');
        this.createContact();
      },
      error: (error) => {
        this.error = error.error;
      },
      complete: () => {
        window.location.href = '/login';
      }
    })     
  }


  createContact() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    let contactColor = '#' + ('000000' + color).slice(-6);

    let body = {
      'first_name': this.formReg.controls['first_name'].value, 
      'last_name': this.formReg.controls['last_name'].value,
      'email': this.formReg.controls['email'].value,
      'phone': '-',
      'color': contactColor
    };    
    this.contactsAPI.postContact(body);
  }

}