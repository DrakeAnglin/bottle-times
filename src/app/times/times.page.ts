import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private db: AngularFireDatabase, private modalController: ModalController, private routerOutlet: IonRouterOutlet) {
    this.itemsRef = this.db.list('times');

    this.items = this.itemsRef.snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  add() {
    this.edit({ date: new Date().toJSON(), ounces: 4 });
  }

  remove(key: string) {
    this.itemsRef.remove(key);
  }

  async edit(item: BottleTime) {
    const modal = await this.modalController.create({
      component: EditComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { item: Object.assign({}, item) },
    });

    return await modal.present();
  }
}
