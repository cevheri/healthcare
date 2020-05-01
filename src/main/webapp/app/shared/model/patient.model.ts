import { Moment } from 'moment';

export interface IPatient {
  id?: number;
  name?: string;
  phone?: string;
  birthDate?: Moment;
  citizenNumber?: string;
}

export class Patient implements IPatient {
  constructor(public id?: number, public name?: string, public phone?: string, public birthDate?: Moment, public citizenNumber?: string) {}
}
