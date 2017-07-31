import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TastieraPage } from '../tastiera/tastiera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController) {}
  open_keyboard() {
    this.navCtrl.push(TastieraPage);
  }
}
