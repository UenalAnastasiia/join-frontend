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


  public getUser(id: number, userObjects: any[], format: string) {
    if (id && userObjects) {
      let user = userObjects.filter((obj) => obj.id == id);

      let abbrName = user[0].first_name[0] + user[0].last_name[0];
      let fullName = user[0].first_name + ' ' + user[0].last_name;
      if (format === 'abbreviation') { return abbrName } else return fullName 
    }
  }
}
