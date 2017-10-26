import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

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
  public img: string;

  constructor(public navCtrl: NavController, public camera: Camera, public base64ToGallery: Base64ToGallery) {
  }

  takePicture() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
        res => console.log('Saved image to gallery ', res),
        err => console.log('Error saving image to gallery ', err)
      );
    }, (err) => {
      console.log(err)
    });
  }

}
