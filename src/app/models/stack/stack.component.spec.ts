import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackComponent } from './stack.component';

describe('StackComponent', () => {
    let component: StackComponent;
    let fixture: ComponentFixture<StackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StackComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should push 1 element and preserve the Stack properties', () => {

        let list = [2];
        component.stack.push(list[list.length-1]);

        expect(component.stack.peek()).toEqual(list[list.length-1]);
        expect(component.stack.getSize()).toEqual(list.length);
    });

    it('should push > 1 elements and preserve the Stack properties', () => {

        let list = [1,2,6];

        for (let idx = 0; idx < list.length; idx++) {
            component.stack.push(list[idx]);
        }
    
        expect(component.stack.peek()).toEqual(list[list.length-1]);
        expect(component.stack.getSize()).toEqual(list.length);
    });

    it('should pop all element from Stack', () => {

        let list = [1,2,6];

        for (let idx = 0; idx < list.length; idx++) {
            component.stack.push(list[idx]);
        }

        while(!component.stack.isEmpty()) {
            component.stack.pop();
        }

        expect(component.stack.peek()).toEqual(null);
        expect(component.stack.getSize()).toEqual(0);
    });

});
