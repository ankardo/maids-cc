import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@maids/api-interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users: User[];
  @Input() readonly = false;

  constructor(private _router: Router) {}

  userSelected(user: User) {
    this._router.navigateByUrl(`/user/${user.id}`);
  }
}
