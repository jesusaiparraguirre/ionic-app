import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ToastHelper } from './toast.helper';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class FunctionHelper {
  constructor(
    private iab: InAppBrowser,
    private toastHelper: ToastHelper,
    private photoViewer: PhotoViewer,
  ) {}

  openUrl(url: string, name?: string) {
    if (url) {
      this.iab.create(url, '_blank', 'location=yes,hidden=yes,beforeload=yes');
    } else {
      this.toastHelper.presentToastError('El link aún no esta disponible');
    }
  }

  openImage(url: string) {
    this.photoViewer.show(url);
  }

  async downloadDocFile(docFile) {
    // console.log(docFile, 'doc  File');
    if (!docFile.uri) {
      alert('No existe el url del archivo!');
      return;
    }
    //"https://media-leadgods-com.s3.us-west-2.amazonaws.com/media/productos/11727/leadgods_u62222d1bd9892.jpg"
    let ref = this;
    const file_request: any = await fetch(docFile.uri);
    // console.log(file_request, 'file request');
    const file_blob = await file_request.blob();
    const reader = new FileReader();
    reader.readAsDataURL(file_blob);
    reader.onloadend = function () {
      ref.saveFile(reader.result, docFile);
    };
  }

  saveFile(base64, docFile) {
    console.log(base64, 'base 64');
    Filesystem.writeFile({
      path: docFile.name,
      data: base64,
      directory: Directory.Documents,
      recursive: true,
      // encoding: Encoding.UTF8,
    }).then((res: any) => {
      console.log(res, 'response file');
      alert(`${docFile.name} descargado!!!`);
      // this.fileOpener.showOpenWithDialog(result.uri, 'application/json')
    });
  }
}
