import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfermaPage } from '../conferma/conferma';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})

export class QrPage {
  categoria: any;
  importo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categoria = navParams.get('categoria');
    this.importo = navParams.get('importo');
  }

  open_qr() {
    alert()
  }

  conferma_codice() {
    this.navCtrl.setRoot(ConfermaPage);
  }
}
