import { IVisit } from 'app/shared/model/visit.model';

export interface IVisitService {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
  price?: number;
  visits?: IVisit[];
}

export class VisitService implements IVisitService {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public active?: boolean,
    public price?: number,
    public visits?: IVisit[]
  ) {
    this.active = this.active || false;
  }
}
