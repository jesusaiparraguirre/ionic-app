import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ClassroomService } from '../../../services/api/classroom.service';

export interface Room {
  id?: string;
  comments?: string,
  durations?: string,
  modules?: string,
  sessions?: string,
  valoration?: number,
  views?: any,
  title?: string,
  detail?: string,
  type?: string,
  authors?: Array<any>
}

@Component({
  selector: 'app-modal-about-course',
  templateUrl: './modal-about-course.component.html',
  styleUrls: ['./modal-about-course.component.scss'],
})

export class ModalAboutCourseComponent implements OnInit {

  public data: any = 0;
  public detail: Room = {
    id: '',
    comments: '',
    durations: '',
    modules: '',
    sessions: '',
    valoration: 0,
    views: null,
    title: '',
    detail: '',
    type: '',
    authors: []
  };

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    private classroomService: ClassroomService
  ) { }

  ngOnInit() {
    this.data = this.navParams.get("data");
    this.getDetail();
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  getDetail() {
    this.classroomService.getClassRoomAbout(this.data).subscribe(
      (response: Room) => {
        this.detail = response;
      }
    )
  }
}
