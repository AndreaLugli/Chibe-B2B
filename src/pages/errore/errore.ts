import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-errore',
  templateUrl: 'errore.html',
})

export class ErrorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  back_home() {
    this.navCtrl.setRoot(HomePage);
  }

}
