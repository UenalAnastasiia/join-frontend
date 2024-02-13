import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }


  public loadAllUsersFromAPI() {
    const url = environment.baseURL + `/users/`;
    return lastValueFrom(this.http.get(url));
  }


  public loadUserFromAPI(id: number) {
    const url = environment.baseURL + `/users/${id}/`;
    return lastValueFrom(this.http.get(url));
  }
}
