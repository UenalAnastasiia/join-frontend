import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { SharedService } from 'src/services/shared.service';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { DialogAddTaskComponent } from '../task-section/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailsComponent } from '../task-section/dialog-task-details/dialog-task-details.component';
import { DialogTaskHistoryComponent } from '../task-section/dialog-task-history/dialog-task-history.component';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TasksApiService } from 'src/services/tasks-api.service';
import { UsersApiService } from 'src/services/users-api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  task: Task = new Task();
  // taskID: string;
  todayDate: any;
  allUsers: any = [];
  todoTask: any;
  inprogressTask: any = [];
  awaitingfeedbackTask: any = [];
  doneTask: any = [];
  searchInput: string;

  statusList: any[] = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];


  constructor(public dialog: MatDialog, public shared: SharedService, private http: HttpClient, private taskAPI: TasksApiService,
    public userAPI: UsersApiService) { }

  ngOnInit() {
    this.todayDate = new Date().getTime();
    this.renderBoard();
  }


  async renderBoard() {
    this.allUsers = await this.userAPI.loadAllUsersFromAPI();
    let allTasks = await this.taskAPI.loadAllTasksFromAPI();
    this.renderAllTasks(allTasks);   
  }


  renderAllTasks(taskData: any) {
    let filterDate = taskData.filter((data: { status: string; }) => data.status != 'Archived');

    for (let index = 0; index < this.statusList.length; index++) {
      this.filterTasks(filterDate, this.statusList[index]);
    }
  }


  filterTasks(tasks: any[], name: string) {
    let filterData = tasks.filter((obj: { status: string; }) => obj.status == name);
    
    if (name === "To do") {
      this.todoTask = filterData;
    } else if (name === "In progress") {
      this.inprogressTask = filterData;
    } else if (name === "Awaiting Feedback") {
      this.awaitingfeedbackTask = filterData;
    } else if (name === "Done") {
      this.doneTask = filterData;
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTaskStatus(event.container.data[event.currentIndex]['id'], event.container.id);
    }
  }


  async updateTaskStatus(taskID: any, stat: string) {
    const url = environment.baseURL + `/tasks/${taskID}/`;
    return lastValueFrom(this.http.patch(url, {status: stat}));
  }


  async updateTaskHistory(id: any) {
    // const docRef = doc(this.firestore, 'tasks', id);
    // const colRef = collection(docRef, "history")
    // addDoc(colRef, {
    //   historyDate: Date.now(),
    //   message: 'Edit Task',
    //   change: 'Was changed'
    // });
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


  openDialogHistory(id: any) {
    const dialog = this.dialog.open(DialogTaskHistoryComponent);
    dialog.componentInstance.taskID = id;
  }


  openDialogArchivedTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showArchiveTaskRequest();
    dialog.componentInstance.archivedID = id;
  }

}