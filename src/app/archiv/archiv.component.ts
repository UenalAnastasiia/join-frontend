import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, collection, query, where } from '@angular/fire/firestore';
import { Task } from 'src/models/task.class';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { SharedService } from 'src/services/shared.service';
import { DialogTaskDetailsComponent } from '../task-section/dialog-task-details/dialog-task-details.component';

@Component({
  selector: 'app-archiv',
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {
  task: Task = new Task();
  archivedTasks$: Observable<any>;
  archivedTasks: any = [];
  todayDate: any;
  searchInput: string;
  noTasks: boolean = true;

  constructor(private firestore: Firestore, public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", "archived"));
    this.archivedTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.archivedTasks$.subscribe((data: any) => {
      this.archivedTasks = data;

      data.length === 0 ? this.noTasks = true : this.noTasks = false;
    });
  }
  

  openTaskDetails(id: any) {
    const dialog = this.dialog.open(DialogTaskDetailsComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.task.id = id;
    this.shared.archivDialog = true;
  }


  openDialogDeleteTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showDeleteTaskRequest();
    dialog.componentInstance.deleteTaskID = id;
  }


  openDialogDeleteAllTasks(taskData: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showDeleteAllTasksFromArchivRequest();
    dialog.componentInstance.allTasksData = taskData;
  }


}