import { Component, Input, OnInit } from '@angular/core';
import { HlsjsPlyrDriver } from '../class/hlsjs-plyr-driver/hlsjs-plyr-driver';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import Pusher from 'pusher-js';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { IResource } from 'src/app/interface/data-room.interface';
import { ClassroomService } from 'src/services/api/classroom.service';

declare var $: any;

@Component({
  selector: 'app-live-player',
  templateUrl: './live-player.component.html',
  styleUrls: ['./live-player.component.scss'],
})
export class LivePlayerComponent implements OnInit {
  @Input() resourceRoom: IResource | undefined;
  public isTransmited = false;
  public timestamp: number | undefined;
  public countdownActive: boolean | undefined;
  // pusher
  private pusher: any;
  channel: any;
  // player
  public options: Plyr.Options = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'settings',
      'fullscreen',
    ],
    autoplay: true,
    captions: { active: true, update: true, language: 'en' },
  };

  public sources: Plyr.Source[] = [
    {
      type: 'video',
      src: '',
    },
  ];

  hlsjsDriver1 = new HlsjsPlyrDriver(true);

  constructor(
    private functionHelper: FunctionHelper,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    if (!this.resourceRoom) {
      return;
    }
    this.isTransmited =
      this.resourceRoom.media.streamState == 'start' ? true : false;
    this.sources = [
      {
        type: 'video',
        src: this.resourceRoom.media.url || '',
      },
    ];

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      //encrypted: true
    });

    this.channel = this.pusher.subscribe(this.resourceRoom.pusherKey);
    // pusher
    this.channel.bind(environment.pusher.event, (data: any) => {
      if (data.state == 'start') {
        this.isTransmited = true;
      } else if (data.state == 'stop') {
        this.isTransmited = false;
      } else if (data.state == 'culminate') {
        this.isTransmited = false;
      }
    });

    const timezone = this.resourceRoom ? this.resourceRoom.media.timezone : '';
    const dateStream: string | null = moment(this.resourceRoom.media.dateStream)
      .tz(timezone || '')
      .format('YYYY-MM-DD HH:mm:ss');
    const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
    this.countdownActive = moment(dateStream).isAfter(dateNow, 'second');
    if (this.countdownActive) {
      this.initCounter(dateStream);
    }
    if (this.isTransmited) {
      this.postAdvanced();
    }
  }

  playerInit(player: Plyr) {
    player.volume = 0.9;

    player.on('error', (event) => {
      console.log('error player');
      screen.orientation.lock('portrait');
    });

    player.on('enterfullscreen', (event) => {
      screen.orientation.lock('landscape');
    });

    player.on('exitfullscreen', (event) => {
      screen.orientation.lock('portrait');
    });
  }

  postAdvanced(): void {
    if (!this.resourceRoom) {
      return;
    }
    if (!this.resourceRoom.id) {
      return;
    }
    let model: any = {
      resourceId: this.resourceRoom.id,
      complete: true,
    };

    this.classroomService.postClassroomAdvanced(model).subscribe((res: any) => {
      // this.nextSessions.emit({ key: this.resourceRoom.key });
    });
  }

  onfinish() {
    this.countdownActive = false;
  }

  initCounter(dateStream: string | null = null) {
    //Contador en vivo
    $(document).ready(function () {
      if ($('.listTiempo').length) {
        $('[data-countdown]').each(function () {
          var $this = $(this);
          dateStream = dateStream ? dateStream : $(this).data('countdown');
          var finalDate = dateStream;
          $(this).countdown(finalDate, function (event) {
            var totalDays = event.offset.totalDays;
            $this = $(this).html(
              event.strftime(
                '' +
                  `<div class="${
                    String(totalDays).length > 2 && 'w-large'
                  }"><span class="datos-tiempo">%D</span><em>Días</em></div><span>:</span>` +
                  '<div><span class="datos-tiempo">%H</span><em>Horas</em></div><span>:</span>' +
                  '<div><span class="datos-tiempo">%M</span><em>Min</em></div><span>:</span>' +
                  '<div><span class="datos-tiempo">%S</span><em>Seg</em></div>'
              )
            );
          });
        });
      }
    });
  }

  openUrl(url: string) {
    this.functionHelper.openUrl(url);
  }
}
