import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AuthenticationService } from 'src/services/authentication.service';
import { SnackBarService } from 'src/services/snack-bar.service';


@Component({
  selector: 'app-dialog-request',
  templateUrl: './dialog-request.component.html',
  styleUrls: ['./dialog-request.component.scss']
})
export class DialogRequestComponent implements OnInit {
  addTask: boolean = false;
  archivTask: boolean = false;
  archivedID: any;
  addContact: boolean = false;
  contactID: any;
  deleteContact: boolean = false;
  deleteTaskID: any;
  deleteTask: boolean = false;
  allTasksData: any;
  deleteAllTasks: boolean = false;
  resetDialog: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogRequestComponent>, 
    private firestore: Firestore, 
    private messageService: SnackBarService,
    public auth: AuthenticationService) { }

  ngOnInit(): void {
  }


  showAddTaskRequest() {
    this.addContact = false;
    this.addTask = true;
    this.archivTask = false;   
    this.deleteContact = false;
    this.deleteTask = false;
    this.deleteAllTasks = false;
    this.resetDialog = false;  
  }


  showArchiveTaskRequest() {
    this.addContact = false;
    this.addTask = false;
    this.archivTask = true;   
    this.deleteContact = false;
    this.deleteTask = false;
    this.deleteAllTasks = false;
    this.resetDialog = false;
  }


  async archivedTask() {
    await updateDoc(doc(this.firestore, "tasks", this.archivedID),
      {
        status: 'archived',
        priority: 'archived'
      });
    this.messageService.showSnackMessage('Task has been archived!');

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }


  showAddContactRequest() {
    this.addContact = true;
    this.addTask = false;
    this.archivTask = false;   
    this.deleteContact = false;
    this.deleteTask = false;
    this.deleteAllTasks = false;
    this.resetDialog = false; 
  }


  showDeleteContactRequest() {
    this.addContact = false;
    this.addTask = false;
    this.archivTask = false;   
    this.deleteContact = true;
    this.deleteTask = false;
    this.deleteAllTasks = false;
    this.resetDialog = false;
  }


  async deleteContactDoc() {
    await deleteDoc(doc(this.firestore, "contacts", this.contactID));

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);


    setTimeout(() => {
      this.messageService.showSnackMessage('Contact has been deleted!');
    }, 1500);
  }


  showDeleteTaskRequest() {
    this.addContact = false;
    this.addTask = false;
    this.archivTask = false;   
    this.deleteContact = false;
    this.deleteTask = true;
    this.deleteAllTasks = false;
    this.resetDialog = false;
  }


  async deleteTaskDoc() {
    await deleteDoc(doc(this.firestore, "tasks", this.deleteTaskID));

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);


    setTimeout(() => {
      this.messageService.showSnackMessage('Task has been deleted!');
    }, 1500);
  }


  showDeleteAllTasksFromArchivRequest() {
    this.addContact = false;
    this.addTask = false;
    this.archivTask = false;   
    this.deleteContact = false;
    this.deleteTask = false;
    this.deleteAllTasks = true;
    this.resetDialog = false;
  }


  async deleteAllTasksFromArchiv() {
    for (let index = 0; index < this.allTasksData.length; index++) {
      await deleteDoc(doc(this.firestore, "tasks",  this.allTasksData[index].id));
    }

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);


    setTimeout(() => {
      this.messageService.showSnackMessage('Archiv has been cleaned!');
    }, 1500);
  }


  showResetPassword() {
    this.addContact = false;
    this.addTask = false;
    this.archivTask = false;   
    this.deleteContact = false;
    this.deleteTask = false;
    this.deleteAllTasks = false;
    this.resetDialog = true;
  }
}