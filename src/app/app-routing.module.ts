import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivComponent } from './archiv/archiv.component';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact-section/contact/contact.component';
import { SummaryComponent } from './summary/summary.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './authentication-section/login/login.component';
import { SignInComponent } from './authentication-section/sign-in/sign-in.component';
import { AuthGuard } from 'src/services/auth-guard';
import { HelpInfoComponent } from './help-info/help-info.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';

const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'archiv', component: ArchivComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'help', component: HelpInfoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignInComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'data-protection', component: DataProtectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
