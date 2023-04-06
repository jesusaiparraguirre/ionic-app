import {
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
import {
  TypeClassroom,
  TypeResource,
} from 'src/services/utils/enum/typeResource.enum';
import { IResource } from 'src/app/interface/data-room.interface';
import { FormatPlayerService } from 'src/services/utils/room/format-player.service';
import { HlsjsPlyrDriver } from '../class/hlsjs-plyr-driver/hlsjs-plyr-driver';
var myScreenOrientation = window.screen.orientation;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
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
  };

  private secondsAdvanced: number = 0;
  // private quality: number = 480;
  public typesClassroom = TypeClassroom;
  public typeResource = TypeResource;
  private endedPlayer: boolean = false;
  private summaryId: any;
  public hlsjsDriver1 = new HlsjsPlyrDriver(true);
  public playerConfig:
    | { sourceInfo: Plyr.SourceInfo; isHls: Boolean }
    | undefined;
  private roomResourceUserId: string | undefined;

  constructor(
    private classroomService: ClassroomService,
    private formatPlayer: FormatPlayerService
  ) {}

  ngOnInit() {
    this.roomResourceUserId = '';
    if (!this.resourceRoom) {
      return;
    }
    this.playerConfig = this.formatPlayer.formatPayerSourceInfo(
      this.resourceRoom
    );
    try {
      const advancedFunc = async () => {
        const advanced: any = await this.classroomService.getClassroomAdvanced(
          Number(this.resourceRoom ? this.resourceRoom.id : 0)
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
    const player = event;
    if (this.playerConfig && !this.playerConfig.isHls) {
      const { sourceInfo } = this.playerConfig;
      player.source = sourceInfo; //this.playlist;
    }
    this.endedPlayer = false;

    // player on ready
    player.on('ready', (event) => {
      player.currentTime = Number(this.secondsAdvanced);
      player.volume = 0.9;
      player.muted = false;
      player.play();
    });

    const duration = player && player.duration;
    let currentTimeAux: number = 0;

    // update time - advanced
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
      myScreenOrientation.lock("portrait");
      this.postAdvanced(duration, true, true);
    });

    player.on('error', (event) => {
      console.log('error player');
    });

    player.on('enterfullscreen', (event) => {
      // console.log('enterfullscreen');
      // allow user rotate
      // myScreenOrientation.unlock();
      screen.orientation.lock('landscape');
    });

    player.on('exitfullscreen', (event) => {
      // console.log('exitfullscreen');
      myScreenOrientation.lock("portrait");
    });
  }

  postAdvanced(
    secondsAdvanced: number,
    isCompleted?: boolean,
    nextSesion?: boolean
  ) {
    console.log(secondsAdvanced, this.resourceRoom, 'this.resourceRoom');
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
    console.log(this.resourceRoom, model, 'lllll');
    this.classroomService.postClassroomAdvanced(model).subscribe((res: any) => {
      console.log(model, 'post user resurce');
      this.roomResourceUserId = res.roomResourceUserId;
      this.summaryId = res.summaryId;
      if (!this.resourceRoom) {
        return;
      }
      if (res.key && isCompleted && nextSesion) {
        this.nextSessions.emit({
          key: this.resourceRoom.key,
          nextKey: res.key,
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
