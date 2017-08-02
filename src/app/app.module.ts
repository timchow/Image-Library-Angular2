import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './models/test-component/test-component.component';
import { LinkedList } from './models/linked-list/linked-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    LinkedList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
