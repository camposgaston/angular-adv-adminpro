import { environment } from '../../environments/environment';

const base_url = environment.base_url;
export class User {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public role?: string,
        public img?: string,
        public uid?: string,
    ) { }

    get imageUrl() {
        if(this.img && this.img.includes('https:')){
            return this.img;
        }

        if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        } else {
            return `${base_url}/upload/users/no-image`;
        }
    }
}
