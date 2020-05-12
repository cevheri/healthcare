import { Moment } from 'moment';
import { GenderType } from 'app/shared/model/enumerations/gender-type.model';

export interface IPatient {
  id?: number;
  name?: string;
  phone?: string;
  birthDate?: Moment;
  citizenNumber?: string;
  genderType?: GenderType;
  bloodtypeName?: string;
  bloodtypeId?: number;
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public birthDate?: Moment,
    public citizenNumber?: string,
    public genderType?: GenderType,
    public bloodtypeName?: string,
    public bloodtypeId?: number
  ) {}
}
