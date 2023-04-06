import { Injectable } from '@angular/core';
import { IResource } from 'src/app/interface/data-room.interface';
import { VIDEO_TYPE_M3U8 } from '../constants/type-file-upload';

@Injectable({
  providedIn: 'root',
})
export class FormatPlayerService {
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
  private formatPlyr(resourceRoom: IResource): Plyr.SourceInfo {
    this.isHlsValue = false;
    return {
      type: 'video',
      title: resourceRoom.title,
      sources: this.formatSources(resourceRoom),
      poster: resourceRoom.media.image || '',
    };
  }

  private formatSources(resourceRoom: IResource): Plyr.Source[] {
    const file = resourceRoom.media.file;
    const provider: any = resourceRoom.media.provider || null;

    if (file && Array.isArray(file)) {
      return file.map((res: any) => {
        const fileLower = res.file.toLowerCase();
        let model: any = {};
        // if (res.default) {
        //   this.quality = res.size;
        // }
        if (fileLower.indexOf(VIDEO_TYPE_M3U8) > -1) {
          this.isHlsValue = true;
          model = { src: res.file, type: 'video' };
        } else {
          model = {
            src: res.file,
            provider: provider,
            type: res.type || null,
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
          return [
            {
              src: file,
              type: 'video',
            }
          ];
        } else {
          const model: any = {
            src: file,
            type: resourceRoom.media.type || 'application/x-mpegURL',
            provider: provider
          };
          return [model];
        }
      } else {
        if (file.indexOf('.m3u8') > -1) {
          this.isHlsValue = true;
        }
        const model: any = {
          src: file,
          provider:  provider
        };
        return [model];
      }
    } else {
      return [];
    }
  }
  //#endregion
}
