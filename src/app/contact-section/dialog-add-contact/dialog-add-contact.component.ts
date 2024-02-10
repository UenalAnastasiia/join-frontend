import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { Contact } from 'src/models/contact.class';


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
    private firestore: Firestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  async saveContact() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    this.contact.bgColor = '#' + ('000000' + color).slice(-6);

    const taskCollection = collection(this.firestore, 'contacts');
    const docRef = await addDoc(taskCollection, this.contact.toJSON());
    this.contact.id = docRef.id;
    this.contact.fullName = this.contact.firstName + ' ' + this.contact.lastName;
    await setDoc(doc(this.firestore, 'contacts', docRef.id), this.contact.toJSON());
    this.loadSpinner = true;

    setTimeout(() => {
      this.clearForm();
      this.loadSpinner = false;
      const dialog = this.dialog.open(DialogRequestComponent);
      dialog.componentInstance.showAddContactRequest();
    }, 2000);
  }


  clearForm() {
    this.contact.firstName = '';
    this.contact.lastName = '';
    this.contact.email = '';
    this.contact.phone = '';
  }
}