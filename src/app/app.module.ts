import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TastieraPage } from '../pages/tastiera/tastiera';
import { QrPage } from '../pages/qr/qr';
import { ConfermaPage } from '../pages/conferma/conferma';
import { ErrorePage } from '../pages/errore/errore';

import { URLVars } from '../providers/urls-var';

import { Network } from '@ionic-native/network';
import { BatteryStatus } from '@ionic-native/battery-status';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TastieraPage,
    QrPage,
    ConfermaPage,
    ErrorePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    TastieraPage,
    QrPage,
    ConfermaPage,
    ErrorePage
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "it-IT"},
    StatusBar,
    SplashScreen,
    URLVars,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    BatteryStatus
  ]
})
export class AppModule {}
