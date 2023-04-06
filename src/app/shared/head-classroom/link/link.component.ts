import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';

import * as Plyr from 'plyr';
import { IResource } from 'src/app/interface/data-room.interface';
import { ClassroomService } from 'src/services/api/classroom.service';
import { FormatPlayerService } from 'src/services/utils/room/format-player.service';

declare var $: any;

var myScreenOrientation = window.screen.orientation;

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() resourceRoom: IResource | undefined;
  @Output() public nextSessions = new EventEmitter();

  @ViewChild(PlyrComponent, { static: true }) plyr: PlyrComponent | undefined;
  public options = {
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
  public secondsAdvanced: number = 0;
  public endedPlayer: boolean = false;
  public summaryId: string = '';
  public playerConfig:
    | { sourceInfo: Plyr.SourceInfo; isHls: Boolean }
    | undefined;
  private roomResourceUserId: string = '';

  constructor(
    private classroomService: ClassroomService,
    public cdRef: ChangeDetectorRef,
    private formatPlayer: FormatPlayerService
  ) {}

  ngOnInit() {
    // console.log(this.resourceRoom, 'this.resourceRoom');
    // myScreenOrientation.lock("portrait");
    // console.log('link player');

    this.playerConfig = this.formatPlayer.formatPayerSourceInfo(
      this.resourceRoom
    );
    try {
      const advancedFunc = async () => {
        const advanced: any = await this.classroomService.getClassroomAdvanced(
          Number(this.resourceRoom ? this.resourceRoom.id : 0)
        );
        console.log(advanced, 'advancedadvanced');
        if (Array.isArray(advanced)) {
          this.postAdvanced(0);
          this.secondsAdvanced = 0;
        } else {
          this.roomResourceUserId = String(advanced.id);
          this.secondsAdvanced = Number(advanced.secondsAdvanced || 0);
        }
        // this.isLoad = true;
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
    // console.log(player.volume, 'player.volume');
    player.source = this.playerConfig.sourceInfo;
    this.endedPlayer = false;
    player.on('ready', (event) => {
      player.currentTime = Number(this.secondsAdvanced);
      player.volume = 0.9;
      player.muted = false;
      player.play();
    });
    player.on('play', (event) => {});

    //   player.forEach (item => {

    //     item.on('enterfullscreen', event => {

    //      $(".plyr__video-wrapper").css({"transform": "rotate(90deg)", "height": winwidth, "width": winheight, "margin-left": "0px", "margin-right": "0px"});
    //     })
    //     item.on('exitfullscreen', event => {
    //      $(".plyr__video-wrapper").css({"transform": "rotate(0deg)", "height": "100%", "width": "100%", "margin-left": "auto", "margin-right": "auto"});
    //     })
    // });

    const duration = player && player.duration;
    let currentTimeAux = 0;
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
      this.postAdvanced(duration, true, true);
      myScreenOrientation.lock('portrait');
    });

    player.on('error', (event) => {
      // this.toastHelper.presentToastError('Ocurrió un error');
    });

    const winwidth = $(window).width();
    const winheight = $(window).height();

    player.on('enterfullscreen', (event) => {
      screen.orientation.lock('landscape');
      $('.plyr--youtube .plyr__video-wrapper').css({
        height: winwidth,
        width: winheight,
        'margin-left': '0px',
        'margin-right': '0px',
      });
    });

    player.on('exitfullscreen', (event) => {
      $('.plyr--youtube .plyr__video-wrapper').css({
        height: '100%',
        width: '100%',
        'margin-left': 'auto',
        'margin-right': 'auto',
      });
      myScreenOrientation.lock('portrait');
    });
  }

  postAdvanced(
    secondsAdvanced: number,
    isCompleted?: boolean,
    nextSesion?: boolean
  ): void {
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
    this.classroomService.postClassroomAdvanced(model).subscribe((res: any) => {
      // console.log(res, 'response post advanced');
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
        this.nextSessions.emit({ key: this.resourceRoom.key });
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
    // console.log(model, 'put avanced');
    this.classroomService
      .putRoomResourceAdvanced(this.roomResourceUserId, model)
      .subscribe((res: any) => {});
  }
}
