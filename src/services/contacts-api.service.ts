import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
  public contactID: any;
  public contactData: any;

  constructor(private http: HttpClient) { }

  public loadAllContactsFromAPI() {
    const url = environment.baseURL + '/contacts/';
    return lastValueFrom(this.http.get(url));
  }


  public loadContactFromAPI(id) {
    const url = environment.baseURL + `/contacts/${id}/`;
    return lastValueFrom(this.http.get(url));
  }
}
