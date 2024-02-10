import { Component, OnInit } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, getDoc } from 'firebase/firestore';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { Contact } from 'src/models/contact.class';
import { SharedService } from 'src/services/shared.service';
import { SnackBarService } from 'src/services/snack-bar.service';


@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss']
})
export class DialogEditContactComponent implements OnInit {
  contactID: any;
  contactData: any;
  contact: Contact;
  loadSpinner: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditContactComponent>,
    private firestore: Firestore,
    public dialog: MatDialog,
    private messageService: SnackBarService,
    public shared: SharedService) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('40vw', '');
    this.loadContact();
  }


  async loadContact() {
    const docRef = doc(this.firestore, "contacts", this.contactID);
    const docSnap = await getDoc(docRef);
    this.contactData = docSnap.data();
  }


  async saveContact() {
    this.loadSpinner = true;

    await updateDoc(doc(this.firestore, "contacts", this.contactData.id),
      {
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        fullName: this.contactData.fullName,
        email: this.contactData.email,
        phone: this.contactData.phone
      });

    this.shared.loadContactDetails(this.contactData.id);

    setTimeout(() => {
      this.loadSpinner = false;
      this.dialog.closeAll();
    }, 2000);

    setTimeout(() => {
      this.messageService.showSnackMessage('Save Changes!');
    }, 2000);
  }


  openDialogDeleteContact(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showDeleteContactRequest();
    dialog.componentInstance.contactID = id;
  }

}