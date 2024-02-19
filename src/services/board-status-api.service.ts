import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardStatusApiService {
  statusList: any = [];

  constructor(private http: HttpClient) { }


  public loadAllStatusFromAPI() {
    const url = environment.baseURL + '/status/';
    this.statusList = lastValueFrom(this.http.get(url));
    return this.statusList;
  }


  public async getStatusList() {
    let statusList = await this.loadAllStatusFromAPI();
    let result = Object.keys(statusList).map(i => statusList[i].name);
    return result;
  }
}
