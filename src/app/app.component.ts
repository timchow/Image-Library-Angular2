import { Component } from '@angular/core';
import { TestComponentComponent } from './models/test-component/test-component.component';
import { ImageComponent } from './models/image/image.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
}
