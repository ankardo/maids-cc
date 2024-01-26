import { User } from '@maids/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';
import {
  Pagination,
} from 'libs/api-interfaces/src/lib/api-interfaces';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
  pagination?: Pagination;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loaded: false
});

const onFailure = (state, { error }) => ({ ...state, error });

const _usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.resetUsers, (state) => usersAdapter.removeAll(state)),
  on(UsersActions.selectUser, (state, { userId }) =>
    Object.assign({}, state, { selectedId: userId }),
  ),
  on(UsersActions.resetSelectedUser, (state) =>
    Object.assign({}, state, { selectedId: null }),
  ),
  // Load users
  on(UsersActions.loadUsers, (state, { page }) => ({
    ...state,
    loaded: false,
    error: null,
    page,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users, pagination }) =>
    usersAdapter.setAll(users, {
      ...state,
      pagination,
      loaded: true,
    }),
  ),
  on(UsersActions.loadUsersFailure, onFailure),
  // Load user
  on(UsersActions.loadUser, (state) => ({
    ...state,
    loaded: false,
    error: null,
    selectedId: null,
  })),
  on(UsersActions.loadUserSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      selectedId: user.id,
      loaded: true,
    }),
  ),
  on(UsersActions.loadUserFailure, onFailure),
  // Add user
  on(UsersActions.createUserSuccess, (state, { user }) =>
    usersAdapter.addOne(user, state),
  ),
  on(UsersActions.createUserFailure, onFailure),
  // Update user
  on(UsersActions.updateUserSuccess, (state, { user }) =>
    usersAdapter.updateOne({ id: user.id, changes: user }, state),
  ),
  on(UsersActions.updateUserFailure, onFailure),
  // Delete user
  on(UsersActions.deleteUserSuccess, (state, { user }) =>
    usersAdapter.removeOne(user.id, state),
  ),
  on(UsersActions.deleteUserFailure, onFailure),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
