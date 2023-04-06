import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/api/global.service'
import { SessionEmailService } from '../../../services/api/session-email.service';
import { FormatHelper } from '../../../services/utils/helpers/format.helper';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  public data: any = {};

  constructor(
    public globalService:GlobalService,
    private sessionEmailService: SessionEmailService,
    public formatHelper: FormatHelper
  ) { 
    this.init();
  }

  ngOnInit() {
  }

  init(){
    this.sessionEmailService.getProfile().subscribe(
      (data) => {
        this.data = data;
      }
    )
  }
}
