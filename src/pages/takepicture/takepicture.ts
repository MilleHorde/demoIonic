import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the TakePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-takepicture',
  templateUrl: 'takepicture.html',
})
export class TakePicturePage {
  public srcImage: string;
  public imageData: string;
  public srcVideo: any;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public base64ToGallery: Base64ToGallery,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private mediaCapture: MediaCapture,
              private localNotifications: LocalNotifications) {
  }

  takePicture() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      this.localNotifications.schedule({
        id: 1,
        text: 'Picture taken',
        data : {secret: "success"}
      });
      this.srcImage = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
    }, (err) => {
      this.showAlert("Taking picture error", err.toString(), "OK")
    });
  }

  takeVideo() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {
          this.srcVideo = data[0].fullPath;
        },
        (err: CaptureError) => alert(err)
      );
  }

  showAlert(title: string, subTitle: string, button: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [button]
    });
    alert.present();
  }

  saving() {
    let loading = this.loadingCtrl.create({content: "Saving picture, please wait..."});
    loading.present()
      .then(() => {
        this.localNotifications.schedule({
          id: 3,
          text: 'Saving picture, please wait...',
          data : {secret: "wait"}
        });
        this.savePicture(loading);
      });
  }

  savePicture(loading) {
    this.base64ToGallery.base64ToGallery(this.imageData, {prefix: '_img'}).then(
      res => {
        loading.dismiss();
        this.localNotifications.schedule({
          id: 4,
          text: 'Picture saved',
          data : {secret: "success"}
        });
        this.showAlert("Picture saved", "Your picture has been saved in your gallery.", "OK");
      },
      err => {
        loading.dismiss();
        this.localNotifications.schedule({
          id: 5,
          text: 'Saving picture error',
          data : {secret: "error"}
        });
        this.showAlert("Saving error", err.toString(), "OK");
      }
    );
  }

  closeCurrentVideo() {
    this.srcVideo = "";
  }

  closeCurrentImage() {
    this.srcImage = "";
    this.imageData = "";
  }

}
