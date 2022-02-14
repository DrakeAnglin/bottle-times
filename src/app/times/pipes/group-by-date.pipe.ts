import { Pipe, PipeTransform } from '@angular/core';
import { BottleTime } from '../times.page';

interface GroupedBottleTime {
  date: string;
  oz: number;
  times: BottleTime[];
}

@Pipe({
  name: 'groupByDate',
})
export class GroupByDatePipe implements PipeTransform {
  transform(times: BottleTime[]): GroupedBottleTime[] {
    return times?.sort((a, b) => a.date < b.date ? 1 : -1).reduce((acc, val) => {
      const thisDate = new Date(parseInt(val.date, 10)).setHours(0, 0, 0, 0).toString();
      const matchingDate = acc.find(v => v.date === thisDate)
      if (matchingDate) {
        matchingDate.oz += val.ounces;
        matchingDate.times.push(val);
      } else {
        acc.push({
          date: thisDate,
          oz: val.ounces,
          times: [val]
        });
      }
      return acc;
    }, [] as GroupedBottleTime[]);
  }
}
