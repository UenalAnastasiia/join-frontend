import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskDetailsComponent } from './dialog-task-details.component';

describe('DialogTaskDetailsComponent', () => {
  let component: DialogTaskDetailsComponent;
  let fixture: ComponentFixture<DialogTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
