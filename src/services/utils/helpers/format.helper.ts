import { Injectable } from '@angular/core';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class FormatHelper {
  constructor() {}

  formatValidateText(value: string) {
    if (value == 'null' || !value) return '---';
    return value;
  }

  formatDate(value: any[]) {
    if (value.length == 0 || !value) return '---';
    let dateFormat = moment(
      new Date(
        Number(value[0]),
        Number(value[1] - 1),
        Number(value[2])
      )
    ).format('DD-MM-YYYY');
    return dateFormat;
  }

  formatUpper(str) {
    var split = str.toLowerCase().split(' ');
    var arr = [];

    for (var i = 0; i < split.length; i++) {
        arr.push(split[i]);
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1);
    }

    var newStr = arr.join(' ');
    return newStr;
  }

  formatDateLong(value:any, zone:any){
    if (value.length == 0 || !value) return '---';
    return moment(value).tz(zone).format('DD/MM/YYYY HH:mm');
  }

}
