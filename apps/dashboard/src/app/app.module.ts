import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@maids/core-data';
import { CoreStateModule } from '@maids/core-state';
import { MaterialModule } from '@maids/material';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

import { UserAppModule } from '../../../user/src/app/app.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    UserAppModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
    TitleCasePipe
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
