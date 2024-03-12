import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {

  transform(endDate: string): number| string  {
    const end = new Date(endDate);
    const current = new Date();
    const time = end.getTime() - current.getTime();
    if(time > 0)
    {const day = Math.ceil(time/(1000*60*60*24));
    return day;}
    else
    {
      return "募資已結束";
    }
  }

}
