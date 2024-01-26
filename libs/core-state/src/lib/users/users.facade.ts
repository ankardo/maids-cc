import { Injectable } from '@angular/core';
import { User } from '@maids/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  loaded$ = this._store.pipe(select(UsersSelectors.getUsersLoaded));
  allUsers$ = this._store.pipe(select(UsersSelectors.getAllUsers));
  selectedUser$ = this._store.pipe(select(UsersSelectors.getSelectedUser));
  userPagination$ = this._store.pipe(select(UsersSelectors.getUserPagination));

  mutations$ = this._actions$.pipe(
    filter(
      (action: Action) =>
        action.type === UsersActions.createUser({} as any).type ||
        action.type === UsersActions.updateUser({} as any).type ||
        action.type === UsersActions.deleteUser({} as any).type
    )
  );

  constructor(private _store: Store, private _actions$: ActionsSubject) {}

  loadUsers(page = 1) {
    this.dispatch(UsersActions.loadUsers({ page }));
  }

  selectUser(userId: number) {
    this.dispatch(UsersActions.selectUser({ userId }));
  }

  resetSelectedUser() {
    this.dispatch(UsersActions.resetSelectedUser());
  }

  loadUser(userId: number) {
    this.dispatch(UsersActions.loadUser({ userId }));
  }

  saveUser(user: User) {
    if (user.id) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  createUser(user: User) {
    this.dispatch(UsersActions.createUser({ user }));
  }

  updateUser(user: User) {
    this.dispatch(UsersActions.updateUser({ user }));
  }

  deleteUser(user: User) {
    this.dispatch(UsersActions.deleteUser({ user }));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }

  getFilteredUsers(searchTerm: string) {
    return this._store.pipe(select(UsersSelectors.selectFilteredUsers(searchTerm)));
  }
}
