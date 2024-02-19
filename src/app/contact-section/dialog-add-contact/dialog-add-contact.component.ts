import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { Contact } from 'src/models/contact.class';
import { ContactsApiService } from 'src/services/contacts-api.service';


@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.scss']
})
export class DialogAddContactComponent implements OnInit {
  contact = new Contact();
  loadSpinner: boolean = false;
  firstName = new FormControl('', [Validators.required, Validators.minLength(1)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(1)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]);

  constructor(public dialogRef: MatDialogRef<DialogAddContactComponent>,
    public dialog: MatDialog,
    public contactsAPI: ContactsApiService) { }

  ngOnInit(): void {
  }


  async saveContact() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    this.contact.color = '#' + ('000000' + color).slice(-6);
    let body = {
      'first_name': this.contact.first_name, 
      'last_name': this.contact.last_name, 
      'email': this.contact.email, 
      'phone': this.contact.phone,
      'color': this.contact.color
    };    
    this.contactsAPI.postContact(body);
    this.afterSaveContact();
  }

  
  afterSaveContact() {
    this.loadSpinner = true;

    setTimeout(() => {
      this.clearForm();
      this.loadSpinner = false;
      const dialog = this.dialog.open(DialogRequestComponent);
      dialog.componentInstance.showAddContactRequest();
    }, 2000);
  }


  clearForm() {
    this.contact.first_name = '';
    this.contact.last_name = '';
    this.contact.email = '';
    this.contact.phone = '';
  }
}