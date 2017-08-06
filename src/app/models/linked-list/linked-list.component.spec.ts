import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedListComponent } from './linked-list.component'
import { List } from './list'
import ListUtility from './list-utility'

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

        let otherList = component.linkedList.split(0);
    
        let RESULT = [1,2,3,4,5,6,7,8,9,10]
        expect(ListUtility.GetList(otherList)).toEqual(RESULT);
    });

    it('should split the list with splitPoint = 5', () => {
        let NUM_ELEMENTS = 10;
        
        for(let idx = 1; idx <= NUM_ELEMENTS; idx++) {
            component.linkedList.insertBack(idx);
        }

        let list2 = component.linkedList.split(5);
    
        let firstHalf_RESULT = [1,2,3,4,5];
        let RESULT = [6,7,8,9,10]

        expect(component.linkedList.getList()).toEqual(firstHalf_RESULT);
        expect(component.linkedList.getSize()).toEqual(firstHalf_RESULT.length);
        expect(ListUtility.GetList(list2)).toEqual(RESULT);
        expect(ListUtility.GetSize(list2)).toEqual(RESULT.length);
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

    it('should merge 2 non empty lists, no ties', () => {
        let NUM_ELEMENTS = 10;
        
        component.linkedList.insertBack(1);
        component.linkedList.insertBack(3);
        component.linkedList.insertBack(4);
        component.linkedList.insertBack(6);

        let list2: List = new List();
        list2.insertBack(2);
        list2.insertBack(5);
        list2.insertBack(7);

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [1,2,3,4,5,6,7]

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should merge 2 non empty lists, with ties', () => {
        let NUM_ELEMENTS = 10;
        
        component.linkedList.insertBack(1);
        component.linkedList.insertBack(3);
        component.linkedList.insertBack(4);
        component.linkedList.insertBack(6);
        component.linkedList.insertBack(9);
        component.linkedList.insertBack(11);

        let list2: List = new List();
        list2.insertBack(2);
        list2.insertBack(2);
        list2.insertBack(3);
        list2.insertBack(5);
        list2.insertBack(8);
        list2.insertBack(11);
        list2.insertBack(13);

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [1,3,4,6,9,11,2,2,3,5,8,11,13];
        RESULT.sort((a,b) => { return a-b });

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should merge 2 lists - second list empty', () => {
        let NUM_ELEMENTS = 10;
        
        component.linkedList.insertBack(1);
        component.linkedList.insertBack(3);
        component.linkedList.insertBack(4);
        component.linkedList.insertBack(6);

        let list2: List = new List();

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [1,3,4,6];

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should merge 2 lists - first list empty', () => {
        let NUM_ELEMENTS = 10;
        

        let list2: List = new List();
        list2.insertBack(2);
        list2.insertBack(2);
        list2.insertBack(3);
        list2.insertBack(5);
        list2.insertBack(8);
        list2.insertBack(11);
        list2.insertBack(13);

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [2,2,3,5,8,11,13];

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should merge 2 empty lists', () => {
        let NUM_ELEMENTS = 10;
        

        let list2: List = new List();

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [];

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should merge 2 lists of 1 item each', () => {
        let NUM_ELEMENTS = 10;
        

        let list2: List = new List();
        list2.insertBack(1);

        component.linkedList.insertBack(4);

        component.linkedList.merge(list2.getHead());
    
        let RESULT = [1,4]; 

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });

    it('should sort the entire list using mergesort', () => {
        let NUM_ELEMENTS = 10;
        
        component.linkedList.insertBack(3);
        component.linkedList.insertBack(6);
        component.linkedList.insertBack(8);
        component.linkedList.insertBack(2);
        component.linkedList.insertBack(1);
        component.linkedList.insertBack(11);
        component.linkedList.insertBack(4);

        component.linkedList.sort();
    
        let RESULT = [3,6,8,2,1,11,4];
        RESULT.sort((a,b) => { return a-b });

        expect(component.linkedList.getList()).toEqual(RESULT);
        expect(component.linkedList.getSize()).toEqual(RESULT.length);
    });


});