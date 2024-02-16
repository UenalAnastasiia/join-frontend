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


  constructor(private contactsAPI: ContactsApiService, private taskAPI: TasksApiService) {
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


  getUpcomingDeadline(taskData: any) {
    let todayDate = new Date().getTime();
    let filterDate = taskData.filter((data: any) => data.due_date > todayDate && data.status != 'Archived');

    if (filterDate.length >= 1) {
      this.deadlineExist = true;
      let dateMap = filterDate.map((data: any) => data.due_date);
      this.upcomingDeadline = new Date(Math.min.apply(null, dateMap));
    } else {
      this.deadlineExist = false;
    }
  }


  getCategoryColor(priority: string) {
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
}