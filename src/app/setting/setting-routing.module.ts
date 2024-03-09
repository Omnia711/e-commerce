import { UpdatePasswordComponent } from './update-password/update-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'forget', pathMatch: 'full' },
  {
    path: 'update',
    component: UpdatePasswordComponent,
    title: 'Update Password',
  },
  {
    path: 'forget',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
