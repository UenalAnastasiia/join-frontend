import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { SharedService } from 'src/services/shared.service';
import { BoardStatusApiService } from 'src/services/board-status-api.service';
import { TasksApiService } from 'src/services/tasks-api.service';

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

  categoryList: any[] = ['Frontend', 'Backend', 'Design', 'Marketing', 'Backoffice', 'Other'];
  statusList: any = [];

  title = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  category = new FormControl('', [Validators.required]);
  datepicker = new FormControl('', [Validators.required]);
  priority = new FormControl('', [Validators.required]);
  assignedTo = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    public dialog: MatDialog,
    public auth: AuthenticationService,
    public contactsAPI: ContactsApiService,
    private shared: SharedService,
    public statusAPI: BoardStatusApiService,
    private taskAPI: TasksApiService) {
  }

  async ngOnInit() {
    this.dialogRef.updateSize('70vw', '');
    this.statusList = await this.statusAPI.loadAllStatusFromAPI();
    this.minDate = new Date();
    if (this.taskStatus) {
      this.task.status = this.taskStatus;
    }
    if (this.contactName) {
      this.hideHolder = false;
      this.task.assigned_to = this.contactName;
      this.task.color = this.contactBG;
    }
    this.loadContacts();
  }


  async loadContacts() {
    this.allContacts = this.allContacts = await this.contactsAPI.loadAllContactsFromAPI();
  }


  selectOptions() {
    this.task.category = this.selectedCategory;
    this.task.status = this.task.status;    
  }

  
  getSelectedContact(selectedContact: any) {  
      this.hideHolder = true;
      this.task.assigned_to = selectedContact.id;
      this.task.color = selectedContact.color;
  }


  async saveTask() {
    this.task.due_date = this.shared.formatdate(this.dueDate);
    const authToken: any = JSON.parse(localStorage.getItem('user') || '"');
    this.auth.getLoggedUser();
    this.auth.userName === undefined ? this.task.editor = null : this.task.editor = authToken['id'];
    let body = {
      'assigned_to': this.task.assigned_to, 
      'category': this.task.category, 
      'description': this.task.description, 
      'due_date': this.task.due_date,
      'editor': this.task.editor,
      'priority': this.task.priority,
      'status': this.task.status,
      'title': this.task.title,
      'color': this.task.color
    };    
    this.taskAPI.postTask(body);
    this.loadSpinner = true;
    this.afterSaveTask();
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