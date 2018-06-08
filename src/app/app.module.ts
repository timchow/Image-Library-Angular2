import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './abstract-data-types/test-component/test-component.component';
import { LinkedListComponent } from './data-structures/linked-list/linked-list.component';
import { StackComponent } from './abstract-data-types/stack/stack.component';
import { ImageComponent } from './models/image/image.component';
import { QueueComponent } from './abstract-data-types/queue/queue.component';
import { QuadtreeComponent } from './data-structures/quadtree/quadtree.component';
import { BinarySearchTreeComponent } from './data-structures/binary-search-tree/binary-search-tree.component';
import { HeapComponent } from './data-structures/heap/heap.component';
import { PriorityQueueComponent } from './abstract-data-types/priority-queue/priority-queue.component';

@NgModule({
    declarations: [
        AppComponent,
        TestComponentComponent,
        LinkedListComponent,
        StackComponent,
        ImageComponent,
        QueueComponent,
        QuadtreeComponent,
        BinarySearchTreeComponent,
        HeapComponent,
        PriorityQueueComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
