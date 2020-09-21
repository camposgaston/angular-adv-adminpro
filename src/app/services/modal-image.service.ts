import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private privHideModal = true;
  public collection: 'users' | 'doctors' | 'hospitals';
  public id: string;
  public img?: string;
  public newChange: EventEmitter<string> = new EventEmitter();

  get IsHiddenModal() {
    return this.privHideModal;
  }

  showModal(
    collection: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image'
  ) {
    this.privHideModal = false;
    this.collection = collection;
    this.id = id;
    // this.img = img;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${collection}/${img}`;
    }
  }

  hideModal() {
    this.privHideModal = true;
  }

  constructor() { }
}
