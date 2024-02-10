import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { collection, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-task-history',
  templateUrl: './dialog-task-history.component.html',
  styleUrls: ['./dialog-task-history.component.scss']
})
export class DialogTaskHistoryComponent implements OnInit {
  taskID: any;
  taskData: any = [];
  taskDetails$: Observable<any>;

  constructor(public dialogRef: MatDialogRef<DialogTaskHistoryComponent>,
    private firestore: Firestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('20vw', '');
    this.loadTask();
  }


  async loadTask() {
    const queryCollection = query(collection(this.firestore, "tasks", this.taskID, "history"), orderBy("historyDate"));
    this.taskDetails$ = collectionData(queryCollection, { idField: "taskID" });
    this.taskDetails$.subscribe((data: any) => {
      this.taskData = data;
    });
  }

}