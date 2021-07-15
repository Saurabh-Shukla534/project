import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'dateformat'
})
export class DateFormatPipe implements PipeTransform{
    transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd') {
        date = new Date(date);
        date.setDate(date.getDate()-day);
        return new DatePipe('en-US').transform(date, format);
      }
}