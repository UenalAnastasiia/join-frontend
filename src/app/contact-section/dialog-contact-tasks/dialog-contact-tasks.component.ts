import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { DialogTaskDetailsComponent } from 'src/app/task-section/dialog-task-details/dialog-task-details.component';
import { Task } from 'src/models/task.class';
import { ContactsApiService } from 'src/services/contacts-api.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-dialog-contact-tasks',
  templateUrl: './dialog-contact-tasks.component.html',
  styleUrls: ['./dialog-contact-tasks.component.scss']
})
export class DialogContactTasksComponent implements OnInit {
  taskData: any;
  contactName: string;
  task: Task = new Task();
  allContacts: any = [];
  loadSpinner: boolean = true;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogContactTasksComponent>, public shared: SharedService, public contactAPI: ContactsApiService) { }

  async ngOnInit() {
    this.allContacts = await this.contactAPI.loadAllContactsFromAPI();

    setTimeout(() => {
      this.loadSpinner = false;
    }, 1000);
  }


  openTaskDetails(id: any) {
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
