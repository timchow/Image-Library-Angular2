import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadtreeComponent } from './quadtree.component';
import { Photo } from '../../models/image/image';

describe('QuadtreeComponent', () => {
    let component: QuadtreeComponent;
    let fixture: ComponentFixture<QuadtreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuadtreeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuadtreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should create a quadtree representing an image', () => {
        
        // need d by d photo, where d = 2^k and k in integers
        /*let photo = new Photo(`C:\Users\tchow\Pictures\in.bmp`);
        photo.initialize.then(()=>{
            debugger;
            component.quadtree.buildTree(photo,photo.getHeight());


            photo.drawOnCanvas().then((canvas)=>{
                let banner = document.getElementById("banner");
                banner.appendChild(canvas);
            })
           
        });*/
    });
});
