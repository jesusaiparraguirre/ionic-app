import { Component, Input, OnInit } from "@angular/core";
import { DataStream } from "src/services/utils/constants/stream.constant";
import { StreamType } from "src/services/utils/enum/stream.enum";
import { Stream } from "src/services/utils/models/model.interface";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.scss"],
})
export class TagComponent implements OnInit {
  @Input() description? = "";
  @Input() stream? = "";
  @Input() isNew? = false;
  @Input() isLive? = false;
  public tagClass = StreamType;
  public tagStream: Stream;

  constructor() {}

  ngOnInit() {
    this.initTag();
  }
  
  ionViewWillEnter() {
  }

  initTag() {
    this.tagStream = DataStream.find(
      (x) => x.code == this.stream
    );
  }
}
