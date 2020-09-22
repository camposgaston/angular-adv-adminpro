
interface HospitalCreator {
    _id: string;
    name: string;
    lastName: string;
    img?: string;
}

export class Hospital {
    constructor(
        public name: string,
        public hid?: string,
        public createdBy?: HospitalCreator,
        public img?: string,
    ) { }
}