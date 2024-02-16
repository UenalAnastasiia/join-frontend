import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SnackBarService } from 'src/services/snack-bar.service';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TasksApiService } from 'src/services/tasks-api.service';
import { SharedService } from 'src/services/shared.service';

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
  selectedCategory: string;
  selectedContact: any;
  dueDate: Date;
  minDate: Date;
  taskStatus: string;
  dateChange: boolean = false;
  contactName: any;
  loadSpinner: boolean = false;
  showData: boolean = false;
  allContacts: any = [];
  hideHolder: boolean = false;

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ['Frontend', 'Backend', 'Design', 'Marketing', 'Backoffice', 'Other'];
  statusList: any[] = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];


  constructor(public dialogRef: MatDialogRef<DialogEditTaskComponent>, 
    public dialog: MatDialog, 
    private messageService: SnackBarService,
    public contactAPI: ContactsApiService,
    private taskAPI: TasksApiService,
    private http: HttpClient,
    public shared: SharedService) { }


  async ngOnInit() {
    this.allContacts = await this.contactAPI.loadAllContactsFromAPI();
    this.dialogRef.updateSize('70vw', '');
    this.renderEditTask();
    this.minDate = new Date();

    setTimeout(() => {
      this.showData = true;
    }, 1000);
  }


  async renderEditTask() {
    let taskData = await this.taskAPI.loadTaskFromAPI(this.taskID);
    this.taskData = taskData[0];
    let contact = await this.contactAPI.loadContactFromAPI(this.taskData.assigned_to);
    this.contactName = contact[0];
  }


  selectOptions() {
    this.taskData.priority = this.taskData.priority;
    this.taskData.category = this.taskData.category;
    this.taskData.status = this.taskData.status;
  }


  getSelectedContact() {
    this.hideHolder = true;
    this.taskData.assigned_to = this.contactName.id;
    this.taskData.color = this.contactName.color;  
  }


  saveTask() {
    this.loadSpinner = true;
    
    if (this.dateChange === true) {
      this.taskData.due_date = this.taskData.due_date.getFullYear() + '-' + (('0'+ (this.taskData.due_date.getMonth() + 1)).slice(-2)) + '-' + ('0'+ this.taskData.due_date.getDate()).slice(-2);
    }

    this.updateTaskDoc();
    this.afterSaveTask();
  }


  updateTaskDoc() {
    let body = {
      'assigned_to': this.taskData.assigned_to, 
      'category': this.taskData.category, 
      'description': this.taskData.description, 
      'due_date': this.taskData.due_date,
      'priority': this.taskData.priority,
      'status': this.taskData.status,
      'title': this.taskData.title
    };    
    const url = environment.baseURL + `/tasks/${this.taskData.id}/`;
    return lastValueFrom(this.http.patch(url, body));
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