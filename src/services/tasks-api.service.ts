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


  postTask(body: { assigned_to: string; category: string; description: string; due_date: any; editor: any; priority: string; status: string; title: string; color: any; }) {
    const url = environment.baseURL + '/tasks/';
    lastValueFrom(this.http.post(url, body));
    window.location.reload();
  }


  public deleteTask(id: number) {
    const url = environment.baseURL + `/tasks/${id}/`;
    lastValueFrom(this.http.delete(url));
    window.location.reload();
  }


  public patchTask(id: number, body: { priority?: any; assigned_to?: any; color?: any; category?: any; description?: any; due_date?: any; status?: any; title?: any; }, check: string) {
    const url = environment.baseURL + `/tasks/${id}/`;
    lastValueFrom(this.http.patch(url, body));
    if (check !== 'drop status') {
      window.location.reload();
    }
  }
}