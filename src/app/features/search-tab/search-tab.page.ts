import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { finalize, take } from "rxjs/operators";
import { PublicationTypeService } from "src/services/api/publication-type.service";
import { PublicationService } from "src/services/api/publication.service";
import { StreamType } from "src/services/utils/enum/stream.enum";
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: "app-search-tab",
    templateUrl: "./search-tab.page.html",
    styleUrls: ["./search-tab.page.scss"],
})
export class SearchTabPage implements OnInit {
    public segment: string = "";
    public data: any = null;
    public publications: Array<any> = [];
    public type = '';
    public keyword = "";
    public page: any = 1;
    public eventInfiniteScroll: any = null;
    public streamType = StreamType;
    public dataSegment = [{ id: "", name: "Todos" }];
    public isLoading = false;
    public environment; any;

    constructor(
        private publicationService: PublicationService,
        private publicationTypeService: PublicationTypeService,
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
        public location: Location
    ) {
        this.environment = environment;
    }

    async ionViewWillEnter() {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
            if (params && params.type) {
                this.type = params.type;
                if (params.type == 0) this.type = ''
                this.initTypesPublication(true);
            } else {
                this.initTypesPublication(false);
            }
        });
    }

    ngOnInit() {
    }

    ionViewWillLeave() {
        this.dataSegment = [{ id: "", name: "Todos" }];
        this.publications = [];
        this.segment = "";
        this.keyword = "";
        this.type = "";
        this.page = 1;
    }

    init() {
        const page = this.page;
        // console.log("DATA111", this.publications);
        const keyword = this.keyword;
        const type = this.type;
        // console.log('this.type', this.type);
        this.isLoading = true;
        this.publicationService
            .getPublication(page, keyword, type).pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            ).subscribe((data) => {
                this.data = data;
                if (this.data.length != 0) {
                    this.publications = Array.from(new Set([...this.publications, ...this.data.data]));
                    if (this.eventInfiniteScroll) {
                        this.eventInfiniteScroll.target.complete();
                    }
                }
                // console.log("DATA", this.publications);
            });
    }

    initTypesPublication(isType = false) {
        this.publicationTypeService.getTypePublication().pipe(
            finalize(() => {
                if (isType) {
                    this.segment = String(this.dataSegment.find(x => x.id == this.type).id);
                    // console.log('this.segment', this.segment);
                }
                this.init();
            })
        ).subscribe((data) => {
            this.dataSegment.push(...data);
        });
    }

    doRefresh(event) {
        setTimeout(() => {
            this.publications = [];
            this.init();
            event.target.complete();
        }, 2000);
    }

    changeType(type: any) {
        this.page = 1;
        this.type = type;
        this.eventInfiniteScroll = null;
        this.publications = [];
        this.init();
    }

    segmentChanged(ev: any) {
        this.segment = ev.detail.value;
        // console.log("segment", this.segment);
    }

    listAuthors(authors: any) {
        let list = "";
        authors.forEach((author) => {
            list = list + ", " + author.name;
        });
        return list.substring(1);
    }

    ionChange(event: any) {
        if (event.detail.value && event.detail.value.length < 4) {
            return
        }
        this.page = 1;
        this.keyword = event.detail.value;
        this.eventInfiniteScroll = null;
        this.publications = [];
        this.init();
    }

    doInfinite(event: any) {
        this.eventInfiniteScroll = event;
        this.page++;
        this.init();
    }

    showCourse(item: any) {
        // console.log(item)
        if (item.subscription.active) {
            let dataSend = {
                id: item.id,
                slug: item.slug,
            }
            this.navController.navigateRoot(["/course-classroom", JSON.stringify(dataSend)]);
        } else {
            this.navController.navigateForward(['/course-detail', item.id])
        }
    }

    showEvent(item: any) {
        if (Boolean(item.subscription.active)) {
            let dataSend = {
                id: item.id,
                slug: item.slug,
            }
            this.navController.navigateForward(["/event-classroom", JSON.stringify(dataSend)]);
        } else {
            this.navController.navigateForward(['/event-detail', item.id])
        }
    }

    showMeeting(id: any) {
        this.navController.navigateForward(['/meeting-detail', id])
    }

    showCampaign(id: any) {
        this.navController.navigateForward(['/campaign-detail', id])
    }
}
