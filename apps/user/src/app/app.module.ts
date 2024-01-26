import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserAppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@maids/core-data';
import { CoreStateModule } from '@maids/core-state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@maids/material';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [UserAppComponent, UsersDetailsComponent, UsersListComponent, UserDetailComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [UserAppComponent],
})
export class AppModule {}

@NgModule({})
export class UserAppModule {
  static forRoot(): ModuleWithProviders<UserAppModule> {
    return {
      ngModule: AppModule,
      providers: [UserAppComponent, UsersDetailsComponent, UsersListComponent],
    };
  }
}
