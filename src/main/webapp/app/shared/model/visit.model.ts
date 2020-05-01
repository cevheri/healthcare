import { Moment } from 'moment';
import { IVisitService } from 'app/shared/model/visit-service.model';
import { VisitType } from 'app/shared/model/enumerations/visit-type.model';

export interface IVisit {
  id?: number;
  date?: Moment;
  type?: VisitType;
  patientName?: string;
  patientId?: number;
  doctorName?: string;
  doctorId?: number;
  departmentName?: string;
  departmentId?: number;
  visitServices?: IVisitService[];
}

export class Visit implements IVisit {
  constructor(
    public id?: number,
    public date?: Moment,
    public type?: VisitType,
    public patientName?: string,
    public patientId?: number,
    public doctorName?: string,
    public doctorId?: number,
    public departmentName?: string,
    public departmentId?: number,
    public visitServices?: IVisitService[]
  ) {}
}
