import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@maids/api-interfaces';
import { UsersFacade } from '@maids/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'maids-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  loaded$: Observable<boolean> = this._usersFacade.loaded$
  selectedUser$: Observable<User> = this._usersFacade.selectedUser$;

  constructor(
    private _route: ActivatedRoute,
    private _usersFacade: UsersFacade,
    private _router: Router
  ) {}

  ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._usersFacade.loadUser(id);
  }

  backButtonPress(){
    this._usersFacade.resetSelectedUser();
    this._router.navigate(['/users']);
  }
}
