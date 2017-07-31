import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QrPage } from '../qr/qr';

@Component({
  selector: 'page-tastiera',
  templateUrl: 'tastiera.html',
})

export class TastieraPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  go_qr() {
    this.navCtrl.push(QrPage);
  }
}
