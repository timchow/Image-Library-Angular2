import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedListComponent } from './linked-list.component'

describe('LinkedListComponent', () => {
    let component: LinkedListComponent;
    let fixture: ComponentFixture<LinkedListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkedListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should insert 1 element to the back', () => {
        let NUM_ELEMENTS = 1;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }
    
        let RESULT = [1];
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should insert > 1 elements to the back', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10];
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should reverse 1 element', () => {
        let NUM_ELEMENTS = 1;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }
    
        component.linkedList.reverse();

        let RESULT = [1];
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should reverse entire list', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }

        component.linkedList.reverse();
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10].reverse();
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should reversenth=1,2,5,10 elements at a time', () => {
        // --- ARRANGE: n = 1 ---
        let NUM_ELEMENTS = 10,
            N = 1;
        
        component.loadElements(NUM_ELEMENTS);
        component.linkedList.reverseNth(1);
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10];
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
        component.linkedList.clear();

        // --- ARRANGE: n = 2 ---
        N = 2;
    
        component.loadElements(NUM_ELEMENTS);
        component.linkedList.reverseNth(N);

        let RESULT2 = [2,1,4,3,6,5,8,7,10,9];
        expect(component.linkedList.getList()).toEqual(RESULT2);
        expect(component.linkedList.getSize()).toEqual(RESULT2.length);
        component.linkedList.clear();

        // --- ARRANGE: n = 5 ---
        N = 5;
    
        component.loadElements(NUM_ELEMENTS);
        component.linkedList.reverseNth(N);

        let RESULT3 = [5,4,3,2,1,10,9,8,7,6];
        expect(component.linkedList.getList()).toEqual(RESULT3);
        expect(component.linkedList.getSize()).toEqual(RESULT3.length);
        component.linkedList.clear();

        // --- ARRANGE: n = 10 ---
        N = 10;
    
        component.loadElements(NUM_ELEMENTS);
        component.linkedList.reverseNth(N);

        let RESULT4 = [10,9,8,7,6,5,4,3,2,1];
        expect(component.linkedList.getList()).toEqual(RESULT4);
        expect(component.linkedList.getSize()).toEqual(RESULT4.length);
        component.linkedList.clear();
    });

    it('should split the list with splitPoint = 0', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }

        component.linkedList.split(0);
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10]
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should split the list with splitPoint = 5', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }

        let firstHalf = component.linkedList.getList();
        component.linkedList.split(5);
    
        let firstHalf_RESULT = [1,2,3,4,5];
        let RESULT = [6,7,8,9,10]

        expect(component.linkedList.getList()).toEqual(firstHalf_RESULT);
        expect(component.linkedList.getSize()).toEqual(firstHalf_RESULT.length);
        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should not split the list with splitPoint >= NUM_ELEMENTS', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }

        component.linkedList.split(NUM_ELEMENTS);
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10]

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });



});