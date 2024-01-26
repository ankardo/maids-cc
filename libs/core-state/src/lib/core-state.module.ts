import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from '.';
import { UsersEffects } from './users/users.effects';
import { UsersFacade } from './users/users.facade';

const STORE_NAME = 'app-store';
const storeConfig: RootStoreConfig<any, any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictActionSerializability: true,
    strictStateImmutability: true,
    strictStateSerializability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([UsersEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: STORE_NAME }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [UsersFacade],
})
export class CoreStateModule {}
