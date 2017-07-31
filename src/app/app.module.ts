import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { URLVars } from '../providers/urls-var';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TastieraPage,
    QrPage,
    ConfermaPage
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
    ConfermaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    URLVars,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
