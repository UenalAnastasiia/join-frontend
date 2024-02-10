import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskHistoryComponent } from './dialog-task-history.component';

describe('DialogTaskHistoryComponent', () => {
  let component: DialogTaskHistoryComponent;
  let fixture: ComponentFixture<DialogTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
