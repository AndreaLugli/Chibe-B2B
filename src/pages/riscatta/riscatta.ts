import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { PremioPage } from '../premio/premio';

import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-riscatta',
  templateUrl: 'riscatta.html',
})

export class RiscattaPage {
  loading: Loading;
  code: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {
  }

  scan() {
    cordova.plugins.barcodeScanner.scan((result) => {
      let cancelled = result.cancelled;
      if(!cancelled) {
        this.code = result.text;
        this.invia_codice_premio();
      }
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'Errore nella scansione del codice QR. Inserirlo manualmente.',
        buttons: ['OK']
      });
      alert.present();
    },
    {
      prompt: "Posiziona un codice QR code dentro al mirino"
    });
  }

  conferma_codice() {
    if(this.code) {
      this.invia_codice_premio();
    }
    else {
      this.showError("Inserisci un codice premio");
    }
  }

  showError(text) {
    if(this.loading) {
      this.loading.dismiss();
    }

    let alert_obj = this.alertCtrl.create({
      title: 'Errore',
      subTitle: text,
      buttons: ['OK']
    });
    alert_obj.present(prompt);
  }

  invia_codice_premio() {

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();

    let riscattaPremioAzienda = this.URLVars.riscattaPremioAzienda();
    let body = new URLSearchParams();
    body.append('token', this.code);

    this.http.post(riscattaPremioAzienda, body).map(res => res.json()).subscribe(
      (data) => {
        this.navCtrl.push(PremioPage, {premio: data});
      },
      (err) => {
         this.showError(err._body)
       }
    );
  }

}
