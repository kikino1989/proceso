import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class PhoteService {
    public options: CameraOptions;
    constructor(
        private camera: Camera,
        private file: File
    ) {
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
    }

    takePicture() {
        return this.camera.getPicture(this.options).then((imageData) => {
          return this.file.resolveLocalFilesystemUrl(imageData);
        }, e => console.log(e));
    }
}
