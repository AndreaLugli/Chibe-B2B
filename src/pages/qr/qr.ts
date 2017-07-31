import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfermaPage } from '../conferma/conferma';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})

export class QrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  open_qr() {
    alert()
  }

  conferma_codice() {
    this.navCtrl.setRoot(ConfermaPage);
  }
}
