import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { NgxsModule } from '@ngxs/store';
import { EditStateModule } from '../edit-state/edit-state.module';
import { EditState } from '../edit-state/edit-state';

//import {  } from '../edit-state/edit-state';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    EditStateModule,
    NgxsModule.forRoot([], {
      developmentMode: true,
    }),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
