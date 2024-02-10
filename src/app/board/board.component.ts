import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { collectionData, doc, Firestore, collection, query, updateDoc, where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { addDoc, orderBy } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { SharedService } from 'src/services/shared.service';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { DialogAddTaskComponent } from '../task-section/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailsComponent } from '../task-section/dialog-task-details/dialog-task-details.component';
import { DialogTaskHistoryComponent } from '../task-section/dialog-task-history/dialog-task-history.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  task: Task = new Task();
  taskID: string;
  todayDate: any;

  todoTask: any;
  inprogressTask: any = [];
  awaitingfeedbackTask: any = [];
  doneTask: any = [];
  searchInput: string;

  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public dialog: MatDialog, private firestore: Firestore, public shared: SharedService) { }

  ngOnInit(): void {
    this.todayDate = new Date().getTime();

    this.shared.renderAllTasks();

    for (let index = 0; index < this.statusList.length; index++) {
      this.filterTasks(this.statusList[index]);
    }
  }


  filterTasks(name: string) {
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", name), orderBy("dueDate"));
    this.shared.allTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.shared.allTasks$.subscribe((data: any) => {
      if (name === "To do") {
        this.todoTask = data;
      } else if (name === "In progress") {
        this.inprogressTask = data;
      } else if (name === "Awaiting Feedback") {
        this.awaitingfeedbackTask = data;
      } else if (name === "Done") {
        this.doneTask = data;
      }
    });
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
    await updateDoc(doc(this.firestore, "tasks", taskID),
      { status: stat });

    this.updateTaskHistory(taskID);
  }


  async updateTaskHistory(id: any) {
    const docRef = doc(this.firestore, 'tasks', id);
    const colRef = collection(docRef, "history")
    addDoc(colRef, {
      historyDate: Date.now(),
      message: 'Edit Task',
      change: 'Was changed'
    });
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