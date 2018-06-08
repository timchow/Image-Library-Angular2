import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueComponent } from './queue.component';

describe('QueueComponent', () => {
    let component: QueueComponent;
    let fixture: ComponentFixture<QueueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QueueComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QueueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should enqueue 1 element and preserve the Queue properties', () => {

        let list = [2];

        component.queue.enqueue(list[list.length - 1]);

        expect(component.queue.peek()).toEqual(list[0]);
        expect(component.queue.getSize()).toEqual(list.length);
    });
    
    it('should enqueue > 1 elements and preserve the Queue properties', () => {

        let list = [1, 2, 6];

        for (let idx = 0; idx < list.length; idx++) {
            component.queue.enqueue(list[idx]);
        }

        expect(component.queue.peek()).toEqual(list[0]);
        expect(component.queue.getSize()).toEqual(list.length);
    });

    it('should dequeue all element from Queue', () => {

        let list = [1, 2, 6];

        for (let idx = 0; idx < list.length; idx++) {
            component.queue.enqueue(list[idx]);
        }

        while (!component.queue.isEmpty()) {
            component.queue.dequeue();
        }

        expect(component.queue.peek()).toEqual(null);
        expect(component.queue.getSize()).toEqual(0);
    });
});
