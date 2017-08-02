import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfermaPage } from '../conferma/conferma';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})

export class QrPage {
  categoria: any;
  importo: any;
  code: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.categoria = navParams.get('categoria');
    this.importo = navParams.get('importo');
  }

  scan() {
    /*
    cordova.plugins.barcodeScanner.scan((result) => {
      let cancelled = result.cancelled;
      if(!cancelled) {
        this.code = result.text;
        this.invia_pagamento();
      }
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'Errore nella scansione del codice QR. Inserirlo manualmente.',
        buttons: ['OK']
      });
      alert.present();
    });
    */
  }

  conferma_codice() {
    if(this.code) {
      this.invia_pagamento();
    }
    else {
      let alert_obj = this.alertCtrl.create({
        title: 'Attenzione',
        subTitle: 'Inserisci un codice personale',
        buttons: ['OK']
      });
      alert_obj.present();
    }
  }

  invia_pagamento() {
    alert(this.categoria);
    alert(this.importo);
    alert(this.code);
    //this.navCtrl.setRoot(ConfermaPage);
  }


}
