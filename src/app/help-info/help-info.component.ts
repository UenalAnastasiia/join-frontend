import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-info',
  templateUrl: './help-info.component.html',
  styleUrls: ['./help-info.component.scss']
})
export class HelpInfoComponent implements OnInit {
  panelOpenState:boolean = false;
  helpInfoVideos = [
    {
      title: 'Add task',
      videoName: 'add_task.mp4'
    },
    {
      title: 'Edit task',
      videoName: 'edit_task.mp4'
    },
    {
      title: 'Archived task',
      videoName: 'archived_task.mp4'
    },
    {
      title: 'Add contact',
      videoName: 'add_contact.mp4'
    },
    {
      title: 'Edit contact',
      videoName: 'edit_contact.mp4'
    },
    {
      title: 'Calendar',
      videoName: 'calendar.mp4'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
