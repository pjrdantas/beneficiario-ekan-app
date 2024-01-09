import { Pipe, PipeTransform } from '@angular/core';

/*
@Pipe({
  name: 'cPF'
})
export class CPFPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return '0';
  }
}
*/

@Pipe({ name: 'cPF' })
export class CPFPipe implements PipeTransform {
    transform(value: string|number): string {
        let valorFormatado = value + '';

        valorFormatado = valorFormatado
            .padStart(11, '00000000000')        // item 1
            .substr(0, 11)                      // item 2
            .replace(/[^0-9]/, '')              // item 3
            .replace(                           // item 4
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
            );

        return valorFormatado;
    }
}
