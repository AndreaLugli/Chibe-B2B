import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Sim } from 'ionic-native';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, private alertCtrl: AlertController, public URLVars:URLVars, public http: Http) {}

  login() {
    Sim.getSimInfo().then(
      (info) => this.success_get_info(info),
      (err) => this.error_get_info(err)
    );
  }

  success_get_info(info) {
    let deviceId = info.deviceId;
    this.login_function(deviceId);
  }

  error_get_info(err) {
    console.log('Unable to get sim info: ', err);
    let deviceId = '868051020276493';
    this.login_function(deviceId);
  }

  login_function(deviceId) {
     this.loading = this.loadingCtrl.create({
      content: "Accesso in corso...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let aziendaLoginURL = this.URLVars.aziendaLoginURL();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.append('imei', deviceId);

    this.http.post(aziendaLoginURL, body).subscribe(
      (data) => this.navCtrl.setRoot(HomePage),
      (err) => this.showError("Non autorizzato")
    );

  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Errore',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
