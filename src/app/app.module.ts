import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TakePicturePage } from '../pages/takepicture/takepicture';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TakePicturePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TakePicturePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Base64ToGallery,
    SpinnerDialog,
    MediaCapture,
    LocalNotifications
  ]
})
export class AppModule {}
