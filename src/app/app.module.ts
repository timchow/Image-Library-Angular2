import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './models/test-component/test-component.component';
import { LinkedListComponent } from './models/linked-list/linked-list.component';
import { StackComponent } from './models/stack/stack.component';
import { ImageComponent } from './models/image/image.component';
import { QueueComponent } from './models/queue/queue.component';
import { QuadtreeComponent } from './models/quadtree/quadtree.component';

@NgModule({
    declarations: [
        AppComponent,
        TestComponentComponent,
        LinkedListComponent,
        StackComponent,
        ImageComponent,
        QueueComponent,
        QuadtreeComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
