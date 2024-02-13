import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './clock.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  greeting: string;
  timerInterval: any;
  allTasks: any = [];
  taskLength: number;
  urgentLength: number;
  toDoLength: number;
  inProgressLength: number;
  awaitingFeedbackLength: number;
  doneLength: number;
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public router: Router, public shared: SharedService, public auth: AuthenticationService) {
  }

  async ngOnInit() {
    this.allTasks = await this.shared.loadTasksFromAPI();
    this.auth.getLoggedUser();
    this.renderSummary(this.allTasks);
  }


  ngOnDestroy() {
    this.getTime();
  }


  renderSummary(fetchedTasks: Object) {
    this.getTime();
    this.getGreeting(); 
    this.getTaskUrgencyLength();
    for (let index = 0; index < this.statusList.length; index++) {
      this.getTaskStatusLength(this.statusList[index]);
    }
    this.shared.getUpcomingDeadline(fetchedTasks);
    this.getTaskLength(fetchedTasks);
  }



  getTime() {
    if (this.router.url.includes('summary')) {
      this.timerInterval = setInterval(() => {
        const deg = 6;
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;
        this.changeTimeStyle(hh, mm, ss);
      });
    } else {
      clearInterval(this.timerInterval);
    }
  }


  changeTimeStyle(hh: number, mm: number, ss: number) {
    (document.querySelector('#hr') as HTMLElement).style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    (document.querySelector('#mn') as HTMLElement).style.transform = `rotateZ(${mm}deg)`;
    (document.querySelector('#sc') as HTMLElement).style.transform = `rotateZ(${ss}deg)`;
  }


  getTaskLength(taskData: any) {
    let filterDate = taskData.filter(data => data.status != 'archived');
    this.taskLength = filterDate.length;
  }


  getTaskStatusLength(statusName: string) {
    let data = this.allTasks.filter(obj => obj.status == statusName);

    if (statusName === "To do") {
      this.toDoLength = data.length;
    } else if (statusName === "In progress") {
      this.inProgressLength = data.length;
    } else if (statusName === "Awaiting Feedback") {
      this.awaitingFeedbackLength = data.length;
    } else if (statusName === "Done") {
      this.doneLength = data.length;
    }
  }


  async getTaskUrgencyLength() {
    let data = this.allTasks.filter(obj => obj.priority == "urgent");
    this.urgentLength = data.length;
  }


  getGreeting() {
    let hours = new Date().getHours();
    if (hours < 6) {
      this.greeting = "Welcome";
    } else if (hours < 10) {
      this.greeting = "Good Morning";
    } else if (hours < 16) {
      this.greeting = "Good Afternoon";
    } else if (hours < 19) {
      this.greeting = "Good Evening";
    } else if (hours < 24) {
      this.greeting = "Good Night";
    }
  }

}