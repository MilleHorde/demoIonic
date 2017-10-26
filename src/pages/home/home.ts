import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  app: any = {name: String, version: Number};
  img: string;

  constructor(public navCtrl: NavController, public camera: Camera) {
    this.app.name = "AppName";
    this.app.version = "3.0";
  }

  takePicture() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }

}
