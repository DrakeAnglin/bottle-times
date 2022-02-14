import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { BottleTime } from '../../times.page';

interface EditBottleTime extends Omit<BottleTime, 'date'> {
  date: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() private item: BottleTime;
  private key: string;
  editItem: EditBottleTime;

  isModalOpen = false;

  constructor(private db: AngularFireDatabase, private modalController: ModalController) {}

  ngOnInit() {
    this.key = this.item?.key;

    const tzOffset = new Date().getTimezoneOffset() / 60;
    const indicator = tzOffset >= 0 ? '+' : '-';

    this.editItem = {
      ounces: 4,
      ...this.item,
      date: this.getToday(),
    };
  }

  save() {
    const postValue: BottleTime = {
      ...this.editItem,
      date: new Date(this.editItem.date).getTime().toString(),
    };

    if (this.key) {
      this.db.list('times').update(this.key, postValue);
    } else {
      this.db.list('times').push(postValue);
    }

    this.modalController.dismiss();
  }

  private getToday() {
    const date = new Date();
    const tzOffset = date.getTimezoneOffset();

    date.setHours(date.getHours() - (tzOffset / 60));
    return date.toISOString();
  }
}
