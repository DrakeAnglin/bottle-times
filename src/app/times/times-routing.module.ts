import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesPage } from './times.page';

const routes: Routes = [
  {
    path: '',
    component: TimesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesPageRoutingModule {}
