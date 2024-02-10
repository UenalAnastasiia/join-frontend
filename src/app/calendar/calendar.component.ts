import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from 'src/models/calendar.class';
import { SharedService } from 'src/services/shared.service';
import { Task } from 'src/models/task.class';
import { DialogTaskDetailsComponent } from '../task-section/dialog-task-details/dialog-task-details.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: CalendarDay[] = [];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  displayMonth: string;
  displayYear: any;
  monthIndex: number = 0;
  task: Task = new Task();
  showLegend: boolean = false;

  constructor(public shared: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.shared.renderAllTasks();
    this.generateCalendarDays(this.monthIndex);
  }


  generateCalendarDays(monthIndex: number): void {
    this.calendar = [];
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;
    for (let i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }


  getStartDateForCalendar(selectedDate: Date) {
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }


  increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }


  decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }


  openTaskDetails(id: any) {
    this.shared.archivDialog = false;
    const dialog = this.dialog.open(DialogTaskDetailsComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.task.id = id;
  }

}