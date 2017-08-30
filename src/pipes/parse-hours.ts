import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseHours',
})
export class ParseHoursPipe implements PipeTransform {

  transform(value: number, ...args) {
    var hours = Math.floor(value / 60);
    var minutes = value % 60;
    return (hours != 0 ? hours + "Hrs " : "") + " " + (minutes != 0 ? minutes + "Min" : "");
  }
}
