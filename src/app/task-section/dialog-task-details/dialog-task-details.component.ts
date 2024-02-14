import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { SharedService } from 'src/services/shared.service';
import { SnackBarService } from 'src/services/snack-bar.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { TasksApiService } from 'src/services/tasks-api.service';
import { UsersApiService } from 'src/services/users-api.service';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dialog-task-details',
  templateUrl: './dialog-task-details.component.html',
  styleUrls: ['./dialog-task-details.component.scss']
})
export class DialogTaskDetailsComponent implements OnInit {
  taskID: any;
  taskData: any = [];
  task: Task;
  todayDate: any;
  allContacts: any = [];
  showData: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogTaskDetailsComponent>, 
    private firestore: Firestore, 
    public dialog: MatDialog, 
    public shared: SharedService,
    public messageService: SnackBarService,
    private taskAPI: TasksApiService,
    public userAPI: UsersApiService,
    public contactAPI: ContactsApiService,
    private http: HttpClient) { }

  
  async ngOnInit() {
    this.dialogRef.updateSize('35vw', '');
    this.allContacts = await this.contactAPI.loadAllContactsFromAPI();
    this.loadTask();
    this.todayDate = new Date().getTime();
    setTimeout(() => {
      this.showData = true;
    }, 1000);
  }


  async loadTask() {
    let taskData = await this.taskAPI.loadTaskFromAPI(this.task.id);
    this.taskData = taskData[0];
  }


  openDialogEditTask(id: any) {
    const dialog = this.dialog.open(DialogEditTaskComponent);
    dialog.componentInstance.taskID = id;
  }


  openDialogDeleteTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showDeleteTaskRequest();
    dialog.componentInstance.deleteTaskID = id;
  }


  async saveTaskFromArchivToBoard(id: any) {
    let body = {
      'priority': 'To do',
      'status': 'Medium'
    };    

    this.updateTask(body, id)
    this.messageService.showSnackMessage('Task saved in Board!');

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }


  updateTask(body, id) {
    const url = environment.baseURL + `/tasks/${id}/`;
    return lastValueFrom(this.http.patch(url, body));
  }

}