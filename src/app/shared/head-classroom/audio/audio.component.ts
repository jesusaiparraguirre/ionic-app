import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClassroomService } from 'src/services/api/classroom.service';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { IMAGE_AUDIO_DEFAULT } from 'src/services/utils/constants/player.constant';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { IResource } from 'src/app/interface/data-room.interface';
import { FormatPlayerAudioService } from 'src/services/utils/room/format-player-audio.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  @Input() resourceRoom: IResource | undefined;
  @Output() public nextSessions = new EventEmitter();

  @ViewChild(PlyrComponent, { static: true }) plyr: PlyrComponent | undefined;
  public options: Plyr.Options = {
    debug: false,
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'settings',
      'fullscreen',
    ],
    settings: ['captions', 'quality', 'speed', 'loop'],
    tooltips: { controls: false, seek: true },
    loop: { active: false },
    // autoplay: true
  };

  public imageDefault = IMAGE_AUDIO_DEFAULT;
  private secondsAdvanced: number = 0;
  private quality: number = 480;
  private endedPlayer: boolean = false;
  public summaryId: any;

  public roomResourceUserId: string = '';
  public playerConfig:
    | { sourceInfo: Plyr.SourceInfo; isHls: Boolean }
    | undefined;

  constructor(
    private classroomService: ClassroomService,
    public cdRef: ChangeDetectorRef,
    private backgroundMode: BackgroundMode,
    private formatPlayer: FormatPlayerAudioService
  ) {}

  ngOnInit() {
    this.roomResourceUserId = '';
    if (!this.resourceRoom) {
      return;
    }
    this.playerConfig = this.formatPlayer.formatPayerSourceInfo(
      this.resourceRoom
    );
    this.imageDefault = this.resourceRoom.media.image || IMAGE_AUDIO_DEFAULT;
    try {
      const advancedFunc = async () => {
        if (!this.resourceRoom) {
          return;
        }
        const advanced: any = await this.classroomService.getClassroomAdvanced(
          Number(this.resourceRoom.id)
        );
        if (Array.isArray(advanced)) {
          this.postAdvanced(0);
          this.secondsAdvanced = 0;
        } else {
          this.roomResourceUserId = String(advanced.id);
          this.secondsAdvanced = Number(advanced.secondsAdvanced || 0);
        }
      };
      // init advanced function
      advancedFunc();
    } catch (error) {
      console.log('Error en el servicio');
    }
  }

  playerInit(event: Plyr) {
    if (!this.playerConfig) {
      return;
    }
    const player = event;
    if (this.playerConfig && !this.playerConfig.isHls) {
      const { sourceInfo } = this.playerConfig;
      player.source = sourceInfo;
    }

    this.endedPlayer = false;
    player.on('ready', (event) => {
      if (this.quality) {
        player.quality = this.quality;
      }
      player.currentTime = Number(this.secondsAdvanced);
      player.volume = 0.9;
      player.muted = false;
      player.play();
      //player.play();
    });

    player.on('play', (event) => {
      player.currentTime = this.secondsAdvanced;
    });

    const duration = player && player.duration;
    let currentTimeAux: number = 0;

    player.on('timeupdate', (event) => {
      const currentTime = Math.round(player.currentTime || 0);
      if (
        currentTime % 6 == 0 &&
        ((Boolean(Number(currentTime)) && currentTime > 4) ||
          (duration && duration - currentTime < 9))
      ) {
        if (currentTimeAux != currentTime) {
          if (
            Boolean(Number(duration)) &&
            Number(duration) - Number(currentTime) <= 6 &&
            !this.endedPlayer
          ) {
            this.postAdvanced(duration, true);
          }
          if (!this.endedPlayer) {
            if (this.roomResourceUserId) {
              this.putAdvanced(currentTime);
            } else {
              this.postAdvanced(currentTime, false);
            }
          }
          currentTimeAux = currentTime;
        }
      }
    });

    player.on('ended', (event) => {
      console.log('ended');
      const duration = player.duration;
      this.endedPlayer = true;
      this.postAdvanced(duration, true, true);
    });

    player.on('error', (event) => {
      // this.toastHelper.presentToastError('Ocurrió un error');
    });

    this.backgroundMode.on('enable').subscribe((s) => {
      player.play();
    });

    this.backgroundMode.on('deactivate').subscribe(() => {
      player.play();
    });
  }

  postAdvanced(
    secondsAdvanced: number,
    isCompleted?: boolean,
    nextSesion?: boolean
  ) {
    if (!this.resourceRoom) {
      return;
    }
    if (!this.resourceRoom.id) {
      return;
    }
    let model: any = {
      secondsAdvanced: secondsAdvanced,
      resourceId: this.resourceRoom.id,
    };
    if (!Boolean(Number(secondsAdvanced))) {
      model.start = true;
    } else if (this.summaryId) {
      model.summaryId = this.summaryId;
    }
    if (isCompleted) {
      model.complete = true;
    }
    this.classroomService
      .postClassroomAdvanced(model)
      .subscribe((data: any) => {
        this.roomResourceUserId = data.roomResourceUserId;
        this.summaryId = data.summaryId;
        if (!this.resourceRoom) {
          return;
        }
        if (data.key && isCompleted && nextSesion) {
          this.nextSessions.emit({
            key: this.resourceRoom.key,
            nextKey: data.key,
          });
        } else if (isCompleted) {
          this.nextSessions.emit({
            key: this.resourceRoom.key,
          });
        }
      });
  }

  putAdvanced(secondsAdvanced: number): void {
    if (!this.resourceRoom) {
      return;
    }
    if (!this.resourceRoom.id) {
      return;
    }
    let model: any = {
      secondsAdvanced: secondsAdvanced,
      resourceId: this.resourceRoom.id,
      summaryId: this.summaryId,
      complete: false,
    };
    this.classroomService
      .putRoomResourceAdvanced(this.roomResourceUserId || '', model)
      .subscribe((res: any) => {});
  }
}
