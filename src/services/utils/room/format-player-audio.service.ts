import { Injectable } from '@angular/core';
import { IResource } from 'src/app/interface/data-room.interface';
import { VIDEO_TYPE_M3U8 } from '../constants/type-file-upload';
import { IMAGE_AUDIO_DEFAULT } from '../constants/player.constant';

@Injectable({
  providedIn: 'root',
})
export class FormatPlayerAudioService {
  private isHlsValue: boolean = false;
  constructor() {}

  public formatPayerSourceInfo(resourceRoom: IResource): {
    sourceInfo: Plyr.SourceInfo;
    isHls: Boolean;
  } {
    return {
      sourceInfo: this.formatPlyr(resourceRoom),
      isHls: this.isHlsValue,
    };
  }

  //#region format player source-info
  private formatPlyr(
    resourceRoom: IResource,
    isAudio?: boolean
  ): Plyr.SourceInfo {
    this.isHlsValue = false;
    return {
      type: 'audio',
      title: resourceRoom.title,
      sources: this.formatSources(resourceRoom),
      poster: resourceRoom.media.image || IMAGE_AUDIO_DEFAULT,
    };
  }

  private formatSources(resourceRoom: IResource): Plyr.Source[] {
    const file = resourceRoom.media.file;
    if (file && Array.isArray(file)) {
      return file.map((res: any) => {
        const fileLower = res.file.toLowerCase();
        let model: any = {};
        // if (res.default) {
        //   this.quality = res.size;
        // }
        if (fileLower.indexOf(VIDEO_TYPE_M3U8) > -1) {
          this.isHlsValue = true;
          model = { src: res.file };
        } else {
          model = {
            src: res.file,
            size: res.size,
          };
        }
        return model;
      });
    } else if (typeof file === 'string') {
      if (resourceRoom.media.type) {
        const fileLower = file;
        if (fileLower.indexOf(VIDEO_TYPE_M3U8) > -1) {
          this.isHlsValue = true;
        }
        return [
          {
            src: file,
          },
        ];
      } else {
        if (file.indexOf('.m3u8') > -1) {
          this.isHlsValue = true;
        }
        return [
          {
            src: file, //resourceRoom.media.file,
          },
        ];
      }
    } else {
      return [];
    }
  }
  //#endregion
}
