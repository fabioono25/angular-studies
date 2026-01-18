import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true, // allows the component to be used without declaring it in an NgModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  title = '1-angular-app';
}
