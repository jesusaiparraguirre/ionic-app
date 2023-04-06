import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  TypeClassroom,
  TypeResource,
} from 'src/services/utils/enum/typeResource.enum';
import { ItemHelper } from 'src/services/utils/helpers/item.helper';
import { AlertHelper } from 'src/services/utils/helpers/alert.helper';
import { FormatHelper } from 'src/services/utils/helpers/format.helper';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClassroomService } from '../../../../../../services/api/classroom.service';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { IDatum } from 'src/app/interface/data-room.interface';

@Component({
  selector: 'app-course-sessions',
  templateUrl: './course-sessions.page.html',
  styleUrls: ['./course-sessions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSessionsPage implements OnInit {
  @Input() dataSessions: IDatum[] = [];
  @Input() keySelect: string | null | undefined;

  @Output() doModalResources = new EventEmitter<any>();
  @Output() doChooseSesion = new EventEmitter<any>();
  public typesClassroom = TypeClassroom;
  public typeResource = TypeResource;
  public currentIndex = 0;

  constructor(
    public itemHelper: ItemHelper,
    public alertHelper: AlertHelper,
    public formatHelper: FormatHelper,
    public cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private classroomService: ClassroomService,
    private functionHelper: FunctionHelper
  ) {}

  ngOnInit() {
  }

  toModalResources(item: IDatum) {
    if (item && !item.status) {
      return;
    }
    this.doModalResources.emit(item);
  }

  toChooseSession(item: IDatum) {
    // console.log(item, 'item data');
    if (item && !item.status) {
      return;
    }
    this.keySelect = item.key;
    // this.currentIndex = index;
    this.doChooseSesion.emit(item);
  }

  openUrl(uri: any) {
    this.functionHelper.openUrl(uri);
  }

  downloadMedia() {}

  openFolder() {
    // console.log('folder');
  }

  downloadService(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  downloadVideo(): void {
    // console.log('download video');
    // this.downloadService('https://djgew9bi99tda.cloudfront.net/media/clase/11727/generic240p/6148ed764ee0f.MP4')
    //   .subscribe(blob => {
    //     const a = document.createElement('a')
    //     const objectUrl = URL.createObjectURL(blob)
    //     a.href = objectUrl
    //     a.download = 'Grabado.mp4';
    //     a.click();
    //     URL.revokeObjectURL(objectUrl);
    //   })
    // const path: 'Download/' + fileName;
    // directory: Directory.Data,
    // blob: BlobFile,
    // recursive: true,
    // on_fallback(errorDownload: any) {
    //   console.error('an error occured while downloading:');
    //   console.error(errorDownload);
    // }
  }

  download() {
    // console.log('download');
    // var downloadurl = "https://djgew9bi99tda.cloudfront.net/media/clase/11727/generic360p/6148ed764ee0f.MP4";
    // const fileTransfer = new FileTransfer();
    // let url = encodeURI(downloadurl + 'Video.mp4');
    // let targetPath = cordova.file.externalDataDirectory+ "Downloads/"  + 'Video.mp4';
    // fileTransfer.create(url, targetPath, true).then((entry) => {
    //     console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //     console.log("download error source " + error.source);
    //     console.log("download error target " + error.target);
    //     console.log("upload error code" + error.code);
    // });
    // var downloadurl = "https://djgew9bi99tda.cloudfront.net/media/clase/11727/generic360p/6148ed764ee0f.MP4";
    // var request:DownloadRequest={
    //   uri: downloadurl,
    //   title: 'MyDownload',
    //   description: 'Ionic video',
    //   mimeType: 'video/mp4',
    //   visibleInDownloadsUi: true,
    //   notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
    //   destinationInExternalFilesDir:{
    //     dirType: 'Downloads',
    //     subPath: 'MyFile.mp4'
    //   }
    // };
    // this.downLoader.download(request).then((location:string)=>{
    //   alert('Descargado'+location);
    // },(err)=>{
    //   alert(JSON.stringify(err));
    // })
  }
}
