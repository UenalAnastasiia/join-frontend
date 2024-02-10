import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contactID: any;
  contactData: any;
  archivDialog: boolean = false;
  allTasks$: Observable<any>;
  allTasks: any = [];
  filterTasks: any = [];
  taskLength: number;
  contactTasks: any;
  deadlineExist: boolean = false;
  upcomingDeadline: any;


  constructor(private firestore: Firestore) {
  }


  renderAllTasks() {
    const taskCollection = collection(this.firestore, 'tasks');
    this.allTasks$ = collectionData(taskCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      this.allTasks = loadData;
      this.filterTasks = loadData.filter(data => data.status != 'archived');
    });
  }


  async loadContactDetails(id: any) {
    if (id) {
      const docRef = doc(this.firestore, "contacts", id);
      const docSnap = await getDoc(docRef);
      this.contactData = docSnap.data();
      this.renderTasksFromContact();
    }
  }


  renderTasksFromContact() {
    const contactCollection = collection(this.firestore, 'tasks');
    const queryCollection = query(contactCollection, orderBy("dueDate"));
    this.allTasks$ = collectionData(queryCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      if (this.contactData) {
        let filterData = loadData.filter((data: any) => data.assignedTo === this.contactData.fullName && data.status != 'archived');
        this.taskLength = filterData.length;
        this.contactTasks = filterData;
        this.getUpcomingDeadline(filterData);
      }
    });
  }


  getUpcomingDeadline(taskData: any) {
    let todayDate = new Date().getTime();
    let filterDate = taskData.filter((data: any) => data.dueDate > todayDate && data.status != 'archived');

    if (filterDate.length >= 1) {
      this.deadlineExist = true;
      let dateMap = filterDate.map((data: any) => data.dueDate);
      this.upcomingDeadline = new Date(Math.min.apply(null, dateMap));
    } else {
      this.deadlineExist = false;
    }
  }


  getCategoryColor(priority: string) {
    switch (priority) {
      case 'Frontend': return 'rgb(115 26 203)';
      case 'Backend': return 'rgb(69 139 127)';
      case 'Design': return '#FF7A00';
      case 'Marketing': return '#0038FF';
      case 'Backoffice': return '#1FD7C1';
      case 'Other': return '#FC71FF';
      default: return '';
    }
  }
}