import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../shared/modules/icons.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    IconsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
