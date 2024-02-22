import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


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


  public postContact(body: { first_name: string; last_name: string; email: string; phone: any; color: any; }) {
    const url = environment.baseURL + '/contacts/';
    lastValueFrom(this.http.post(url, body));
    window.location.reload();
  }


  public patchContact(id: number, body: { first_name: any; last_name: any; email: any; phone: any; color: any; }) {
    const url = environment.baseURL + `/contacts/${id}/`;
    lastValueFrom(this.http.patch(url, body));
    window.location.reload();
  }


  public deleteContact(id: number) {
    const url = environment.baseURL + `/contacts/${id}/`;
    lastValueFrom(this.http.delete(url));
    window.location.reload();
  }
}