import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Sim } from 'ionic-native';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

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

      setTimeout(function () {
        if(navigator.onLine) {
          console.log("Siamo online")
        }
        else {
          alert("Attenzione! Sei offline");
        }
      }, 5000);
    }, error => console.error(error));

    this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
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

    /*
    Sim.requestReadPermission().then(
      () => {
        Sim.getSimInfo().then(
          (info) => this.success_get_info(info),
          (err) => this.error_get_info(err)
        );
      },
      () => console.log('Permission denied')
    );

    */

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
    alert('Unable to get sim info')
    //DEBUG
    //let deviceId = '868051020276493';
    //this.login_function(deviceId);
    //End debug
  }

  login_function(deviceId) {
    this.loading = this.loadingCtrl.create({
      content: "Accesso in corso...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let aziendaLoginURL = this.URLVars.aziendaLoginURL();

    let body = new URLSearchParams();
    body.append('imei', deviceId);

    this.http.post(aziendaLoginURL, body).subscribe(
      (data) => {
        this.navCtrl.setRoot(HomePage);
      },
      (err) => {
        console.log(err);
        this.showError(err.text());
      }
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
