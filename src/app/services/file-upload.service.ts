import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePicture(
    file: File,
    collection: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {

    try {

      const url = `${base_url}/upload/${collection}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      console.log(data);

      return 'Image name';

    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
