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
  allUsers: any = [];
  showData: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogTaskDetailsComponent>, 
    private firestore: Firestore, 
    public dialog: MatDialog, 
    public shared: SharedService,
    public messageService: SnackBarService,
    private taskAPI: TasksApiService,
    public userAPI: UsersApiService) { }

  
  async ngOnInit() {
    this.dialogRef.updateSize('35vw', '');
    this.allUsers = await this.userAPI.loadAllUsersFromAPI();
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


  async saveTaskFroArchivToBoard(id: any) {
    await updateDoc(doc(this.firestore, "tasks", id),
      {
        status: 'To do',
        priority: 'Medium'
      });
    this.messageService.showSnackMessage('Task saved in Board!');

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }
}