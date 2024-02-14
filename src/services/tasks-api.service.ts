import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(private http: HttpClient) { }


  public loadAllTasksFromAPI() {
    const url = environment.baseURL + '/tasks/';
    return lastValueFrom(this.http.get(url));
  }


  public loadTaskFromAPI(id) {
    const url = environment.baseURL + `/tasks/${id}/`;
    return lastValueFrom(this.http.get(url));
  }


  public deleteTask(id: number) {
    const url = environment.baseURL + '/tasks/' + id;
    return lastValueFrom(this.http.delete(url));
  }
}
