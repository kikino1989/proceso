import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Injectable({
    providedIn: 'root'
})
export class PhoteService {
    public options: CameraOptions;
    constructor(
        private camera: Camera,
        private file: File,
        private filePath: FilePath
    ) {
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
    }

    public takePicture() {
        return this.camera.getPicture(this.options).then((imagePath) => {
            const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }, e => console.log(e));
    }

    // Create a new name for the image
    private createFileName() {
        const d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        return this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then((entry) => {
            return entry.nativeURL;
        }, e => console.log(e));
    }
}
