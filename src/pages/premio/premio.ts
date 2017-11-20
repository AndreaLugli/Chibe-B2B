import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-premio',
  templateUrl: 'premio.html',
})
export class PremioPage {
  desiderio: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.desiderio = navParams.get('premio');
      console.log(this.desiderio)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremioPage');
  }

}
