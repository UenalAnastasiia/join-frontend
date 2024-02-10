import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, orderBy, query, setDoc } from 'firebase/firestore';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {
  @ViewChild('dateInput', {
    read: MatInput
  }) dateInput: MatInput;

  choosenPriority: any;
  clickPriority: boolean = false;
  task = new Task();
  selectedCategory: string;
  dueDate: Date;
  minDate: Date;
  taskStatus: string;
  contactName: string;
  contactBG: any;
  loadSpinner: boolean = false;

  allContacts$: Observable<any>;
  allContacts: any = [];
  selectedContact: any;
  hideHolder: boolean = true;

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];

  title = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  category = new FormControl('', [Validators.required]);
  datepicker = new FormControl('', [Validators.required]);
  priority = new FormControl('', [Validators.required]);
  assignedTo = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private firestore: Firestore,
    public dialog: MatDialog,
    public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('70vw', '');
    this.minDate = new Date();
    if (this.taskStatus) {
      this.task.status = this.taskStatus;
    }
    if (this.contactName) {
      this.hideHolder = false;
      this.task.assignedTo = this.contactName;
      this.task.bgColor = this.contactBG;
    }
    this.loadContacts();
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
    this.task.category = this.selectedCategory;
    this.task.status = this.task.status;
  }

  
  getSelectedContact(selectedContact: any) {  
      this.hideHolder = true;
      this.task.assignedTo = selectedContact.fullName;
      this.task.bgColor = selectedContact.bgColor;
  }


  async saveTask() {
    this.task.dueDate = this.dueDate.getTime();
    this.auth.getLoggedUser();
    this.auth.userName === undefined ? this.task.editor = 'Guest' : this.task.editor = this.auth.userName;
    const taskCollection = collection(this.firestore, 'tasks');
    const docRef = await addDoc(taskCollection, this.task.toJSON());
    this.task.id = docRef.id;
    await setDoc(doc(this.firestore, 'tasks', docRef.id), this.task.toJSON());
    this.loadSpinner = true;

    this.updateTaskHistory(docRef.id);
    this.afterSaveTask();
  }


  async updateTaskHistory(id: any) {
    const docRef = doc(this.firestore, 'tasks', id);
    const colRef = collection(docRef, "history")
    addDoc(colRef, {
      historyDate: Date.now(),
      message: 'Add Task'
    });
  }


  afterSaveTask() {
    setTimeout(() => {
      this.clearForm();
      this.loadSpinner = false;
      const dialog = this.dialog.open(DialogRequestComponent);
      dialog.componentInstance.showAddTaskRequest();
    }, 2000);
  }


  clearForm() {
    this.task.title = '';
    this.task.description = '';
    this.selectedCategory = undefined;
    this.dateInput.value = '';
    this.task.priority = '';
    this.selectedContact = undefined;
    this.task.status = '';
    this.clickPriority = false;
  }

}