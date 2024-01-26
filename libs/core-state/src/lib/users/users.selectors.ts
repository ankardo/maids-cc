import { User } from '@maids/api-interfaces';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { usersAdapter, UsersState, USERS_FEATURE_KEY } from './users.reducer';

export const getUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  getUsersState,
  (state: UsersState) => state.loaded,
);

export const getUsersError = createSelector(
  getUsersState,
  (state: UsersState) => state.error,
);

export const getAllUsers = createSelector(getUsersState, (state: UsersState) =>
  selectAll(state),
);

export const getUserPagination = createSelector(
  getUsersState,
  (state: UsersState) => getUsersState,
  (state: UsersState) => state.pagination,
);

export const getUsersEntities = createSelector(
  getUsersState,
  (state: UsersState) => selectEntities(state),
);

export const getSelectedUserId = createSelector(
  getUsersState,
  (state: UsersState) => state.selectedId,
);

const emptyUser: User = {
  id: null,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
};

export const getSelectedUser = createSelector(
  getUsersEntities,
  getSelectedUserId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : emptyUser),
);

export const selectFilteredUsers = (searchTerm: string) =>
  createSelector(getAllUsers, (users) =>
    users.filter(
      (user) =>
        user.first_name.includes(searchTerm) ||
        user.last_name.includes(searchTerm) ||
        user.email.includes(searchTerm),
    ),
  );


