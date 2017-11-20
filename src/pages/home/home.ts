import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TastieraPage } from '../tastiera/tastiera';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { RiscattaPage } from '../riscatta/riscatta';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  categorie: any;
  fornitore: any;

  constructor(public navCtrl: NavController, public URLVars:URLVars, public http: Http, public platform: Platform) {}

  ionViewDidLoad() {
    let aziendaCategorieURL = this.URLVars.aziendaCategorieURL();

    this.http.get(aziendaCategorieURL).map(res => res.json()).subscribe(
      (data) => {
        this.categorie = data;
      },
      (err) => console.log(err)
    );

    let sonoFornitore = this.URLVars.sonoFornitore();

    this.http.get(sonoFornitore).subscribe(
      (data) => {
        this.fornitore = true;
      },
      (err) => {
        this.fornitore = false;
      }
    );

  }

  open_keyboard(categoria) {
    this.navCtrl.push(TastieraPage, {categoria: categoria});
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  public initializeBackButtonCustomHandler(): void {
      this.platform.registerBackButtonAction(() => {
          this.customHandleBackButton();
      }, 10);
  }

  private customHandleBackButton(): void {
      let view_name = this.navCtrl.getActive().name;
      if(view_name == "HomePage") {
        console.log("Nooo");
      }
      else {
        this.navCtrl.pop();
      }
  }

  public riscatta_premio() {
    this.navCtrl.push(RiscattaPage);
  }

}
