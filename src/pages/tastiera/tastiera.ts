import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { QrPage } from '../qr/qr';

@Component({
  selector: 'page-tastiera',
  templateUrl: 'tastiera.html',
})

export class TastieraPage {
  categoria: any;
  importo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.categoria = navParams.get('categoria');
  }

  go_qr() {
    if(this.importo && this.importo > 0) {
      this.navCtrl.push(QrPage, {categoria: this.categoria, importo: this.importo});
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Attenzione',
        subTitle: 'Inserisci un valore positivo per poter continuare.',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
