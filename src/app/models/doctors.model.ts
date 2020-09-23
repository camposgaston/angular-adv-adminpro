import { Hospital } from './hospital.model';

interface DoctorCreator {
    _id: string;
    name: string;
    lastName: string;
    img?: string;
}

export class Doctor {
    constructor(
        public name: string,
        public did?: string,
        public createdBy?: DoctorCreator,
        public img?: string,
        public hospital?: Hospital
    ) { }
}