import { Component, OnDestroy, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';
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
  task = new Task();
  allTasks$: Observable<any>;
  allTasks: any = [];
  taskID: string;

  taskLength: number;
  urgentLength: number;
  toDoLength: number;
  inProgressLength: number;
  awaitingFeedbackLength: number;
  doneLength: number;
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public router: Router, private firestore: Firestore, public shared: SharedService, public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.auth.getLoggedUser();
    this.renderTasks();
    this.renderSummary();
    this.getTime();
    this.getGreeting();    
  }


  ngOnDestroy() {
    this.getTime();
  }


  renderSummary() {
    this.getTaskUrgencyLength();
    for (let index = 0; index < this.statusList.length; index++) {
      this.getTaskStatusLength(this.statusList[index]);
    }
  }


  renderTasks() {
    const taskCollection = collection(this.firestore, 'tasks');
    this.allTasks$ = collectionData(taskCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      this.shared.getUpcomingDeadline(loadData);
      this.getTaskLength(loadData);
    });
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
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", statusName));
    this.allTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.allTasks$.subscribe((data: any) => {
      if (statusName === "To do") {
        this.toDoLength = data.length;
      } else if (statusName === "In progress") {
        this.inProgressLength = data.length;
      } else if (statusName === "Awaiting Feedback") {
        this.awaitingFeedbackLength = data.length;
      } else if (statusName === "Done") {
        this.doneLength = data.length;
      }
    });
  }


  async getTaskUrgencyLength() {
    const queryCollection = query(collection(this.firestore, "tasks"), where("priority", "==", "urgent"));
    this.allTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.allTasks$.subscribe((data: any) => {
      this.urgentLength = data.length;
    });
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