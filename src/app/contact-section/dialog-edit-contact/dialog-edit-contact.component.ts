import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogRequestComponent } from 'src/app/dialog-request/dialog-request.component';
import { Contact } from 'src/models/contact.class';
import { ContactsApiService } from 'src/services/contacts-api.service';
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
    public dialog: MatDialog,
    private messageService: SnackBarService,
    public shared: SharedService,
    private contactsAPI: ContactsApiService) { }

  async ngOnInit() {
    this.dialogRef.updateSize('40vw', '');
    let contactData = await this.contactsAPI.loadContactFromAPI(this.contactID);
    this.contactData = contactData[0];    
  }


  async saveContact() {
    this.loadSpinner = true;

    let body = {
      'first_name': this.contactData.first_name, 
      'last_name': this.contactData.last_name, 
      'email': this.contactData.email, 
      'phone': this.contactData.phone,
      'color': this.contactData.color
    };  
    
    this.contactsAPI.patchContact(this.contactData.id, body);
    this.shared.loadContactDetails(this.contactData.id);
    this.afterSaveContact();
  }


  afterSaveContact() {
    setTimeout(() => {
      this.loadSpinner = false;
      this.dialog.closeAll();
      this.messageService.showSnackMessage('Save Changes!');
    }, 2000);
  }


  openDialogDeleteContact(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showDeleteContactRequest();
    dialog.componentInstance.contactID = id;
  }

}