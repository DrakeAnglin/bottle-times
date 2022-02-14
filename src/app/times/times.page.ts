import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { EditComponent } from './dialog/edit/edit.component';

export interface BottleTime {
  date: string;
  ounces: number;
  key?: string;
}

@Component({
  selector: 'app-times',
  templateUrl: 'times.page.html',
  styleUrls: ['times.page.scss'],
})
export class TimesPage {
  isModalOpen = false;
  itemsRef: AngularFireList<BottleTime>;
  items: Observable<BottleTime[]>;

  constructor(
    private db: AngularFireDatabase,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
  ) {
    this.itemsRef = this.db.list('times');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      catchError(error => {
        if (error.code === 'PERMISSION_DENIED') {
          this.authService.signinWithGoogle();
        }
        return [];
      }),
    );
  }

  remove(key: string) {
    this.itemsRef.remove(key);
  }

  quickEditOZ(item: BottleTime, change: -1 | 1) {
    item.ounces += change;
    this.itemsRef.update(item.key, item);
  }

  async edit(item?: BottleTime) {
    const modal = await this.modalController.create({
      component: EditComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { item },
    });

    return await modal.present();
  }

  trackKey(_: number, item: BottleTime) {
    return item.key;
  }
}
