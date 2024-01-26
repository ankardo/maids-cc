import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { catchError, concatMap, delay, map, switchMap } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { User } from '@maids/api-interfaces';
import { UsersService } from '@maids/core-data';
import {
  UserResponse,
  UsersResponse,
} from 'libs/api-interfaces/src/lib/api-interfaces';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.loadUsers),
      fetch({
        run: (action) =>
          this._usersService.all(action.page).pipe(
            map((response: UsersResponse) => {
              const { page, per_page, total, total_pages } = response;
              return UsersActions.loadUsersSuccess({
                users: response.data,
                pagination: { page, per_page, total, total_pages },
              });
            }),
            delay(750),
          ),
        onError: (action, error) => UsersActions.loadUsersFailure({ error }),
      }),
    ),
  );

  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.loadUser),
      fetch({
        run: (action) =>
          this._usersService.find(action.userId).pipe(
            map((response: UserResponse) =>
              UsersActions.loadUserSuccess({ user: response.data }),
            ),
            delay(750),
          ),
        onError: (action, error) => UsersActions.loadUserFailure({ error }),
      }),
    ),
  );

  createUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.createUser),
      pessimisticUpdate({
        run: (action) =>
          this._usersService
            .create(action.user)
            .pipe(
              map((user: User) => UsersActions.createUserSuccess({ user })),
            ),
        onError: (action, error) => UsersActions.createUserFailure({ error }),
      }),
    ),
  );

  updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.updateUser),
      pessimisticUpdate({
        run: (action) =>
          this._usersService
            .update(action.user)
            .pipe(
              map((user: User) => UsersActions.updateUserSuccess({ user })),
            ),
        onError: (action, error) => UsersActions.updateUserFailure({ error }),
      }),
    ),
  );

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.deleteUser),
      pessimisticUpdate({
        run: (action) =>
          this._usersService
            .delete(action.user)
            .pipe(
              map((user: User) => UsersActions.deleteUserSuccess({ user })),
            ),
        onError: (action, error) => UsersActions.deleteUserFailure({ error }),
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
  ) {}
}
