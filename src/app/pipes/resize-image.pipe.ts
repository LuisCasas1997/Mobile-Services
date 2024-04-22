import { Pipe, PipeTransform } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Pipe({
  name: 'resizeImage'
})
export class ResizeImagePipe implements PipeTransform {
  transform(value: string, width: number, height: number): Observable<string> | null {
    if (!value) return null;

    const img = new Image();
    img.src = value;

    return fromEvent(img, 'load').pipe(
      take(1),
      map(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          return canvas.toDataURL();
        }

        return ''; 
      })
    );
  }
}
