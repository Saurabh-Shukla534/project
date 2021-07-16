import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateformat'
})
export class DateFormatPipe implements PipeTransform{
    transform(date: Date | string, format: string = 'dd-MM-yyyy') {
        date = new Date(date);
        date.setDate(date.getDate());
        return new DatePipe('en-IN').transform(date, format);
      }
}