import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

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
  public loading: any;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public base64ToGallery: Base64ToGallery,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  takePicture() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      this.srcImage = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
    }, (err) => {
      this.showAlert("Taking picture error", err.toString(), "OK")
    });
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
      .then(()=>{
        this.savePicture(loading);
      });
  }

  savePicture(loading) {
    this.base64ToGallery.base64ToGallery(this.imageData, {prefix: '_img'}).then(
      res => {
        loading.dismiss();
        this.showAlert("Picture saved", "Your picture has been saved in your gallery.", "OK");
      },
      err => {
        loading.dismiss();
        this.showAlert("Saving error", err.toString(), "OK");
      }
    );
  }

}
