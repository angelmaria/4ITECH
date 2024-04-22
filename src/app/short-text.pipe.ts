import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
  standalone: true
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string, maxLength: number = 25): string {
    if (!value) {
      return '';
    }

    const truncatedValue = value.substring(0, maxLength);
    return truncatedValue + '...';
  }

}
