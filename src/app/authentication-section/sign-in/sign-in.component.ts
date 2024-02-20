import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(public service: AuthenticationService, private router: Router) { }

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
    console.log(this.formReg.value);
    this.service.register(this.formReg.value);
  }

}