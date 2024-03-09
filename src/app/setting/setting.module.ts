import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdatePasswordComponent, ForgetPasswordComponent],
  imports: [CommonModule, SettingRoutingModule, ReactiveFormsModule],
})
export class SettingModule {}
