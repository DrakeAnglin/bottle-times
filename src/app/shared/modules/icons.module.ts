import { NgModule } from '@angular/core';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faEdit, faTimer, faTrash } from '@fortawesome/pro-duotone-svg-icons';

@NgModule({
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(private faConfig: FaConfig, library: FaIconLibrary) {
    this.faConfig.defaultPrefix = 'fad';

    library.addIcons(faTimer, faEdit, faTrash);
  }
}
