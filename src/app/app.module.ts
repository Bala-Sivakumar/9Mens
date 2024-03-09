import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from '../utils/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule,
    FormsModule,
    AppRoutingModule,
    AppComponent,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MdbModalModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
