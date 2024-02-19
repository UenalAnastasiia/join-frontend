import { Injectable } from '@angular/core';
import { ContactsApiService } from './contacts-api.service';
import { TasksApiService } from './tasks-api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  archivDialog: boolean = false;
  filterTasks: any = [];
  taskLength: number;
  contactTasks: any;
  deadlineExist: boolean = false;
  upcomingDeadline: any;
  todayDate: any;


  constructor(private contactsAPI: ContactsApiService, private taskAPI: TasksApiService) {
    let t = new Date();
    this.todayDate = this.formatdate(t);  
  }


  public async loadContactDetails(id: any) {
    if (id) {
      let loadedData = await this.contactsAPI.loadContactFromAPI(id);
      this.contactsAPI.contactData = loadedData[0];
      
      let allTasks = await this.taskAPI.loadAllTasksFromAPI();
      this.renderTasksFromContact(allTasks);
    }
  }


  async renderTasksFromContact(allTasks) {
    // let filterData = allTasks.filter((data: any) => data.assigned_to === this.contactsAPI.contactData.id && data.status != 'Archived');
    // this.taskLength = filterData.length;
    // this.contactTasks = filterData;
    // this.getUpcomingDeadline(filterData);
  }


  public getUpcomingDeadline(taskData: any) {
    let filterDate = taskData.filter((data: any) => data.due_date > this.todayDate && data.status.name != 'Archived');

    if (filterDate.length >= 1) {
      this.deadlineExist = true;
      let dateMap = filterDate.map((data: any) => data.due_date);
      this.upcomingDeadline = dateMap[0];
    } else {
      this.deadlineExist = false;
    }
  }


  public getCategoryColor(priority: string) {
    switch (priority) {
      case 'Frontend': return 'rgb(115 26 203)';
      case 'Backend': return 'rgb(69 139 127)';
      case 'Design': return '#FF7A00';
      case 'Marketing': return '#0038FF';
      case 'Backoffice': return '#1FD7C1';
      case 'Other': return '#FC71FF';
      default: return '';
    }
  }

  public formatdate(d: Date) {
      return d.getFullYear() + '-' + (('0'+ (d.getMonth() + 1)).slice(-2)) + '-' + ('0'+ d.getDate()).slice(-2);
  }
}