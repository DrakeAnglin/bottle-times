import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../shared/modules/icons.module';
import { EditComponent } from './dialog/edit/edit.component';
import { GroupByDatePipe } from './pipes/group-by-date.pipe';
import { TimesPageRoutingModule } from './times-routing.module';
import { TimesPage } from './times.page';


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TimesPageRoutingModule, IconsModule],
  declarations: [TimesPage, EditComponent, GroupByDatePipe],
})
export class TimesPageModule {}
