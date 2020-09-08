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
}
