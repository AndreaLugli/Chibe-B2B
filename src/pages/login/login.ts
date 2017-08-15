import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Sim } from 'ionic-native';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { Network } from '@ionic-native/network';
import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;

  constructor(private batteryStatus: BatteryStatus, private network: Network, public navCtrl: NavController, public loadingCtrl:LoadingController, private alertCtrl: AlertController, public URLVars:URLVars, public http: Http) {}

  ionViewDidEnter() {
    this.network.onDisconnect().subscribe(data => {
      alert("Attenzione! Sei offline");
    }, error => console.error(error));

    this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log("Batteria");
      let level = status.level;
      let isPlugged = status.isPlugged;

      if(!isPlugged && level < 20) {
        alert("Attenzione! Batteria scarica. Collegare ad una fonte di corrente prima di continuare");
      }

    }, error => console.error(error));
  }

  ionViewDidLoad() {
    this.login();
  }

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
    //DEBUG
    let deviceId = '868051020276493';
    this.login_function(deviceId);
    //End debug
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
