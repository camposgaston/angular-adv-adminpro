import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, collection: 'users' | 'doctors' | 'hospitals'): string {

    if (img && img.includes('https:')) {
      return img;
    }

    if (img) {
      return `${base_url}/upload/${collection}/${img}`;
    } else {
      return `${base_url}/upload/${collection}/no-image`;
    }
  }

}
