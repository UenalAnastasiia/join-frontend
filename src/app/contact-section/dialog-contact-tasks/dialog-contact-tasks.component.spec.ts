import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactTasksComponent } from './dialog-contact-tasks.component';

describe('DialogContactTasksComponent', () => {
  let component: DialogContactTasksComponent;
  let fixture: ComponentFixture<DialogContactTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContactTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContactTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
