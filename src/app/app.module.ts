import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SummaryComponent } from './summary/summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact-section/contact/contact.component';
import { DialogAddTaskComponent } from './task-section/dialog-add-task/dialog-add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogTaskDetailsComponent } from './task-section/dialog-task-details/dialog-task-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArchivComponent } from './archiv/archiv.component';
import { DialogRequestComponent } from './dialog-request/dialog-request.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogAddContactComponent } from './contact-section/dialog-add-contact/dialog-add-contact.component';
import { DialogContactDetailsComponent } from './contact-section/dialog-contact-details/dialog-contact-details.component';
import { DialogEditTaskComponent } from './task-section/dialog-edit-task/dialog-edit-task.component';
import { DialogEditContactComponent } from './contact-section/dialog-edit-contact/dialog-edit-contact.component';
import { DialogContactTasksComponent } from './contact-section/dialog-contact-tasks/dialog-contact-tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChunkPipe } from '../services/chunk-pipe';
import { DialogTaskHistoryComponent } from './task-section/dialog-task-history/dialog-task-history.component';
import { LoginComponent } from './authentication-section/login/login.component';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { SignInComponent } from './authentication-section/sign-in/sign-in.component';
import { MatMenuModule } from '@angular/material/menu';
import { HelpInfoComponent } from './help-info/help-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponent,
    BoardComponent,
    ContactComponent,
    DialogAddTaskComponent,
    DialogTaskDetailsComponent,
    ArchivComponent,
    DialogRequestComponent,
    DialogAddContactComponent,
    DialogContactDetailsComponent,
    DialogEditTaskComponent,
    DialogEditContactComponent,
    DialogContactTasksComponent,
    CalendarComponent,
    ChunkPipe,
    DialogTaskHistoryComponent,
    LoginComponent,
    SignInComponent,
    HelpInfoComponent,
    ImprintComponent,
    DataProtectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
