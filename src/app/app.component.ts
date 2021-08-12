import { Component, ViewChild } from '@angular/core';

import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) router: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private alertController: AlertController,
    // private routerOutlet: IonRouterOutlet,
    // private location: Location
  ) {
    this.initializeApp();
    //this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // backButtonEvent() {
  //   this.platform.backButton.subscribeWithPriority (10, () => {
  //     if (!this.routerOutlet.canGoBack()) {
  //       this.backButtonAlert();
  //     } else {
  //       this.location.back();
  //     }
  //   });
  // }

  // async backButtonAlert() {
  //   const alert = await this.alertController.create({
  //     message: 'You just pressed the Back button!',
  //     buttons: [{
  //       text: 'Cancel',
  //       role: 'Cancel'
  //     }, {
  //       text: 'Close App',
  //       handler: () => {
  //         navigator['app'].exitApp();
  //       }
  //     }]
  //   });

  //   await alert.present();
  // }
}
