import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { BottleTime } from '../../times.page';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() item: BottleTime = {
    date: new Date().getTime().toString(),
    ounces: 4,
  };

  isModalOpen = false;

  constructor(private db: AngularFireDatabase, private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.item);
  }

  save() {
    this.item.date = new Date(this.item.date).getTime().toString();

    if (this.item.key) {
      this.db.list('times').update(this.item.key, this.item);
    } else {
      this.db.list('times').push(this.item);
    }

    this.modalController.dismiss();
  }
}
