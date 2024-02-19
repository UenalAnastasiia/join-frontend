import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { SharedService } from 'src/services/shared.service';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { DialogAddTaskComponent } from '../task-section/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailsComponent } from '../task-section/dialog-task-details/dialog-task-details.component';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TasksApiService } from 'src/services/tasks-api.service';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { BoardStatusApiService } from 'src/services/board-status-api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  task: Task = new Task();
  allTasks: any = [];
  allUsers: any = [];
  allContacts: any = [];
  searchInput: string;
  statusList: any = [];


  constructor(public dialog: MatDialog, public shared: SharedService, private http: HttpClient, private taskAPI: TasksApiService,
    public contactAPI: ContactsApiService, public statusAPI: BoardStatusApiService) { }

  ngOnInit() {
    this.renderBoard();
  }


  async renderBoard() {
    this.statusList = await this.statusAPI.loadAllStatusFromAPI();
    this.allContacts = await this.contactAPI.loadAllContactsFromAPI();
    this.allTasks = await this.taskAPI.loadAllTasksFromAPI();
  }


  drop(event: CdkDragDrop<string[]>, status) {
    if (event.previousContainer !== event.container) {
      this.updateTaskStatus(event.item.data, status);
    }
  }


  async updateTaskStatus(taskID: any, stat: any) {    
    const url = environment.baseURL + `/tasks/${taskID}/`;
    let body = {status : stat}
    return lastValueFrom(this.http.patch(url, body));
  }


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }


  openTaskDetails(id: any) {
    this.shared.archivDialog = false;
    const dialog = this.dialog.open(DialogTaskDetailsComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.task.id = id;
  }


  openDialogArchivedTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showArchiveTaskRequest();
    dialog.componentInstance.archivedID = id;
  }

}