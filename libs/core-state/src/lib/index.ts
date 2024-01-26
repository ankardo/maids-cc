import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromUsers.USERS_FEATURE_KEY]: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromUsers.USERS_FEATURE_KEY]: fromUsers.usersReducer,
};
