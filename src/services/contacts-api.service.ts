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


  public getContact(id: number, contactObjects: any[], format: string) {
    if (id && contactObjects) {
      let contact = contactObjects.filter((obj) => obj.id == id);

      let abbrName = contact[0].first_name[0] + contact[0].last_name[0];
      let fullName = contact[0].full_name;
      if (format === 'abbreviation') { return abbrName } else return fullName 
    }
  }
}
