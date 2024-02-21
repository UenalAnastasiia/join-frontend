import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
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
  error: string;

  constructor(public dialog: MatDialog, private http: HttpClient, 
    public shared: SharedService, private userAPI: UsersApiService) { }


  public loginWithUsernameAndPassword(username: string, password: string): Observable<any> {
    const url = environment.baseURL + '/login/';
    const body = {
      "username": username,
      "password": password
    };
    return this.http.post(url, body);
  }


  register(body): Observable<any> {
    const url = environment.baseURL + '/register/';
    return this.http.post(url, body);
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
}