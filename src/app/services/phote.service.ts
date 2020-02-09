import { Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PhoteService {
    public options: CameraOptions;
    constructor(
        private camera: Camera,
        private file: File,
        private platform: Platform,
        private filePath: FilePath,
        private actionSheetCtrl: ActionSheetController
    ) {
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
    }

    async selectImage() {
        return new Promise(resolve => {
            this.actionSheetCtrl.create({
                header: "Select Image",
                buttons: [{
                        text: 'From Library',
                        handler: () => {
                            this.options.sourceType =this.camera.PictureSourceType.PHOTOLIBRARY;
                            resolve(this.takePicture());
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.options.sourceType = this.camera.PictureSourceType.CAMERA;
                            resolve(this.takePicture());
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            }).then(actionSheet => {
                actionSheet.present();
            })
        });
    }
     
    takePicture() {
        return this.camera.getPicture(this.options).then(imagePath => {
            if (this.platform.is('android') && this.options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        });
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
