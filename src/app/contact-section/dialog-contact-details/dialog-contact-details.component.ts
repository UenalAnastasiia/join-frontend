import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';
import { SharedService } from 'src/services/shared.service';
import { DialogContactTasksComponent } from '../dialog-contact-tasks/dialog-contact-tasks.component';
import { DialogAddTaskComponent } from 'src/app/task-section/dialog-add-task/dialog-add-task.component';


@Component({
  selector: 'app-dialog-contact-details',
  templateUrl: './dialog-contact-details.component.html',
  styleUrls: ['./dialog-contact-details.component.scss']
})
export class DialogContactDetailsComponent implements OnInit, OnChanges {
  @Input() contactID: any;

  constructor(public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    this.shared.loadContactDetails(this.contactID);
  }


  openDialogAddTask(name: string, color: any) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.contactName = name;
    dialog.componentInstance.contactBG = color;
  }


  openDialogEditContact(id: any) {
    const dialog = this.dialog.open(DialogEditContactComponent);
    dialog.componentInstance.contactID = id;
  }


  openDialogContactTasks(tasks: any, name: string) {
    const dialog = this.dialog.open(DialogContactTasksComponent);
    dialog.componentInstance.taskData = tasks;
    dialog.componentInstance.contactName = name;
  }
}