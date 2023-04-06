import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import { StreamTypeResources } from 'src/services/utils/enum/stream.enum';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import Pusher from 'pusher-js';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { IResource } from 'src/app/interface/data-room.interface';
import { ClassroomService } from 'src/services/api/classroom.service';
// import { FormatHelper } from 'src/services/utils/helpers/format.helper';

//declare const Pusher: any;
declare var $: any;

@Component({
  selector: 'app-live-link',
  templateUrl: './live-link.component.html',
  styleUrls: ['./live-link.component.scss'],
})
export class LiveLinkComponent implements OnInit {
  @Input() resourceRoom: IResource;
  public streamTypesResource = StreamTypeResources;
  public timestamp: number;
  public countdownActive: boolean;
  public seeTransmissionPast = false;
  // pusher
  private pusher: any;
  private channel: any;
  public minutes: any;
  startLive: boolean;

  constructor(
    public toastHelper: ToastHelper,
    private classroomService: ClassroomService,
    // public formatHelper: FormatHelper,
    private functionHelper: FunctionHelper
  ) {}

  ngOnInit(): void {
    // window.screen.orientation.lock("portrait");
    const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
    this.startLive =
      this.resourceRoom.media.streamState == 'start' ? true : false;
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      //encrypted: true
    });
    this.channel = this.pusher.subscribe(this.resourceRoom.pusherKey);
    // pusher

    this.channel.bind(environment.pusher.event, (data: any) => {
      if (data.state == 'start') {
        this.countdownActive = false;
      } else if (data.state == 'stop') {
        this.countDownActive(dateNow);
      } else if (data.state == 'culminate') {
        this.countdownActive = false;
      }
    });

    const dateStreamEnd = moment(this.resourceRoom.media.dateStreamEnd)
      .tz(this.resourceRoom.media.timezone)
      .format('YYYY-MM-DD HH:mm:ss');
    const streamStateEnd = moment(dateStreamEnd).isBefore(dateNow, 'hour');
    // end data
    if (streamStateEnd && !this.countdownActive) {
      this.resourceRoom.media.streamState = 'culminate';
    } else {
      this.countDownActive(dateNow);
    }
  }

  countDownActive(dateNow) {
    const dateStream = moment(this.resourceRoom.media.dateStream)
      .tz(this.resourceRoom.media.timezone)
      .format('YYYY-MM-DD HH:mm:ss');

    const date = new Date();
    const dateLater = new Date(this.resourceRoom.media.dateStream);
    this.minutes = Math.abs(
      Math.round((dateLater.getTime() - date.getTime()) / 1000 / 60)
    );

    this.countdownActive = moment(dateStream).isAfter(dateNow, 'second');
    if (this.countdownActive) {
      this.initCounter(dateStream);
    }

    if (this.resourceRoom.media.streamState != 'start') {
      if (
        new Date() > new Date(this.resourceRoom.media.dateStreamEnd) &&
        this.resourceRoom.media.streamState === 'stop'
      ) {
        this.seeTransmissionPast = true;
      }
    }
  }

  onfinish() {
    this.countdownActive = false;
  }

  openUrl(url: string) {
    this.postAdvanced();
    this.functionHelper.openUrl(url);
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

  initCounter(dateStream = null) {
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
}
