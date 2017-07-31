import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-conferma',
  templateUrl: 'conferma.html',
})

export class ConfermaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  back_home() {
    this.navCtrl.setRoot(HomePage);
  }
}
