import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection, doc, getDoc, orderBy, query, updateDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/services/snack-bar.service';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {
  taskID: any;
  taskData: any = [];
  choosenPriority: any;
  clickPriority: boolean = false;
  task: Task;
  selectedCategory: string;
  selectedContact: any;
  dueDate: Date;
  minDate: Date;
  taskStatus: string;
  dateChange: boolean = false;
  todayDate: any;
  contactName: any;
  loadSpinner: boolean = false;

  allContacts$: Observable<any>;
  allContacts: any = [];
  hideHolder: boolean = false;

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public dialogRef: MatDialogRef<DialogEditTaskComponent>, 
    private firestore: Firestore, 
    public dialog: MatDialog, 
    private messageService: SnackBarService) { }


  ngOnInit(): void {
    this.dialogRef.updateSize('70vw', '');
    this.loadTask();
    this.loadContacts();
    this.minDate = new Date();
    this.todayDate = new Date().getTime();
  }


  async loadTask() {
    const docRef = doc(this.firestore, "tasks", this.taskID);
    const docSnap = await getDoc(docRef);
    this.taskData = docSnap.data();
    this.contactName = this.taskData.assignedTo;
  }


  loadContacts() {
    const contactCollection = collection(this.firestore, 'contacts');
    const queryCollection = query(contactCollection, orderBy("firstName"));
    this.allContacts$ = collectionData(queryCollection, { idField: "contactID" });

    this.allContacts$.subscribe((loadData: any) => {
      this.allContacts = loadData;
    });
  }


  selectOptions() {
    this.taskData.priority = this.taskData.priority;
    this.taskData.category = this.taskData.category;
    this.taskData.status = this.taskData.status;
  }


  getSelectedContact() {
    this.hideHolder = true;
    this.taskData.assignedTo = this.contactName.fullName;
    this.taskData.bgColor = this.contactName.bgColor;
  }


  saveTask() {
    this.loadSpinner = true;
    
    if (this.dateChange === true) {
      this.taskData.dueDate = this.taskData.dueDate.getTime();
    }

    this.updateTaskDoc();
    this.updateTaskHistory(this.taskData.id);
    this.afterSaveTask();
  }


  async updateTaskDoc() {
    await updateDoc(doc(this.firestore, "tasks", this.taskData.id),
    {
      title: this.taskData.title,
      description: this.taskData.description,
      category: this.taskData.category,
      dueDate: this.taskData.dueDate,
      priority: this.taskData.priority,
      status: this.taskData.status,
      assignedTo: this.taskData.assignedTo,
      bgColor: this.taskData.bgColor
    });
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


  afterSaveTask() {
    setTimeout(() => {
      this.loadSpinner = false;
      this.dialog.closeAll();
      this.messageService.showSnackMessage('Save Changes!');
    }, 2000);
  }


  openDialogArchivedTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showArchiveTaskRequest();
    dialog.componentInstance.archivedID = id;
  }

}