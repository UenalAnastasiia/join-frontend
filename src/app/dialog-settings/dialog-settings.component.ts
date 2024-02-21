import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardStatusApiService } from 'src/services/board-status-api.service';
import { SnackBarService } from 'src/services/snack-bar.service';
import { TasksApiService } from 'src/services/tasks-api.service';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {
  statusList: any = [];
  loadSpinner: boolean = true;
  showAddBoardInput: boolean = false;
  newStatusName: string = '';

  constructor(public dialogRef: MatDialogRef<DialogSettingsComponent>,
    public dialog: MatDialog, public statusAPI: BoardStatusApiService, private messageService: SnackBarService, private taskAPI: TasksApiService) { }


  async ngOnInit() {
    this.statusList = await this.statusAPI.loadAllStatusFromAPI();

    setTimeout(() => {
      this.loadSpinner = false;
      this.dialogRef.updateSize('30vw', '');
    }, 1000);
  }


  addBoard(name: string | number) {
    if (name === '') {
      this.messageService.showSnackMessage('Name is empty!');
    } else {
      this.loadSpinner = true;
      this.statusAPI.postBoard(name);

      setTimeout(() => {
        this.loadSpinner = false;
        this.messageService.showSnackMessage('New Board added!');
        this.showAddBoardInput = false;
        this.newStatusName = '';
        this.dialogRef.close();
      }, 1000);
    }
  }


  editBoard(boardName: string | number, id: number) {
    this.loadSpinner = true;
    this.statusAPI.patchBoardStatus(boardName, id);

    setTimeout(() => {
      this.loadSpinner = false;
      this.messageService.showSnackMessage('Save Changes!');
      this.dialogRef.close();
    }, 1000);
  }


  async checkTasksInBoard(id: number) {
    this.loadSpinner = true;
    let tasks = await this.taskAPI.loadAllTasksFromAPI();
    let filterTasks = Object.keys(tasks).map(i => tasks[i].status == id);
    let result = filterTasks.find(elem => elem === true);

    if (result === true || this.statusList.length <= 4) {
      this.messageService.showSnackMessage('Error, requirements are not met!');
      this.loadSpinner = false;
    } else {
      this.statusAPI.deleteBoardStatus(id);
    
      setTimeout(() => {
        this.loadSpinner = false;
        this.messageService.showSnackMessage('Delete Board completed!');
        this.dialogRef.close();
      }, 1000);
    }
  }
}