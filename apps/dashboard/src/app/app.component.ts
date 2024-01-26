import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links = [{ path: '/', icon: 'supervised_user_circle', title: 'users' }];
  isSidenavOpen = true;

  logout() {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
