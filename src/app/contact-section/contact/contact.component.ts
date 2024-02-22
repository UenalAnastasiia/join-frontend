import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/services/shared.service';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { ContactsApiService } from 'src/services/contacts-api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  allContacts: any = [];
  currentAlphabet: any;
  showDetails: boolean = false;
  searchInput: string;
  activeElmIndex: number;

  constructor(public dialog: MatDialog, public shared: SharedService, public contactsAPI: ContactsApiService) { }

  async ngOnInit() {
    this.allContacts = await this.contactsAPI.loadAllContactsFromAPI();   
  }


  checkLetter(name: string) {
    if (this.currentAlphabet === name.charAt(0).toLowerCase() && this.searchInput == undefined) {
      return false;
    } else {
      this.currentAlphabet = name.charAt(0).toLowerCase();
      return true;
    }
  }


  openDialogAddContact() {
    this.dialog.open(DialogAddContactComponent);
  }
}