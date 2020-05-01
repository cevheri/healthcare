import { IDepartment } from 'app/shared/model/department.model';

export interface IDoctor {
  id?: number;
  name?: string;
  phone?: string;
  salary?: number;
  departments?: IDepartment[];
}

export class Doctor implements IDoctor {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public salary?: number,
    public departments?: IDepartment[]
  ) {}
}
