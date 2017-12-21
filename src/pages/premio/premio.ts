import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-premio',
  templateUrl: 'premio.html',
})
export class PremioPage {
  desiderio: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.desiderio = navParams.get('premio');
  }

  back_home() {
    this.navCtrl.setRoot(HomePage);
  }

}
