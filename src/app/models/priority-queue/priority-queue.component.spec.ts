import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityQueueComponent } from './priority-queue.component';

describe('PriorityQueueComponent', () => {
  let component: PriorityQueueComponent;
  let fixture: ComponentFixture<PriorityQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
