import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@maids/api-interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UsersDetailsComponent {
  @Input() user: User;
  @Input() readonly = false;
  @Output() back = new EventEmitter();
}
