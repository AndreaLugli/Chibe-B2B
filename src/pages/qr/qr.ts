import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ConfermaPage } from '../conferma/conferma';
import { ErrorePage } from '../errore/errore';

import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})

export class QrPage {
  loading: Loading;
  categoria: any;
  importo: any;
  code: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {
    this.categoria = navParams.get('categoria');
    this.importo = navParams.get('importo');
  }

  scan() {

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
    },
    {
      prompt: "Posiziona un codice QR code dentro al mirino"
    });
    
  }

  conferma_codice() {
    if(this.code) {
      this.invia_pagamento();
    }
    else {
      this.showError("Inserisci un codice personale");
    }
  }

  invia_pagamento() {
    let categoria_id = this.categoria.pk;

    this.loading = this.loadingCtrl.create({
     content: "Registrazione pagamento..",
     dismissOnPageChange: true
   });

   let registraPagagamentoURL = this.URLVars.registraPagagamentoURL();

   let body = new URLSearchParams();
   body.append('categoria_id', categoria_id);
   body.append('importo', this.importo);
   body.append('code', this.code);

   this.http.post(registraPagagamentoURL, body).subscribe(
     (data) => this.navCtrl.setRoot(ConfermaPage),
     (err) => {
        //this.showError(err._body)
        this.navCtrl.setRoot(ErrorePage);
      }
   );
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

}
