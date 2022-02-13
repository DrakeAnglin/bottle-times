import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IconsModule } from '../shared/modules/icons.module';
import { EditComponent } from './dialog/edit/edit.component';
import { TimesPageRoutingModule } from './times-routing.module';
import { TimesPage } from './times.page';


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, TimesPageRoutingModule, IconsModule],
  declarations: [TimesPage, EditComponent],
})
export class TimesPageModule {}
