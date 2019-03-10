import { SharesModule } from 'src/app/shares/shares.module';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  declarations: [
    PermissionComponent,
    AddPermissionComponent,
    EditPermissionComponent
  ]
})
export class PermissionModule { }
