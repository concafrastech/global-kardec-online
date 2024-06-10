import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'logPipe',
    standalone: true
})
export class LogPipePipe implements PipeTransform {

    transform(value: any): any {

        console.log(value);
        return value;
    }

}
