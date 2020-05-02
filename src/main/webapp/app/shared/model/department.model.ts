import { IDoctor } from 'app/shared/model/doctor.model';
import { DepartmentType } from 'app/shared/model/enumerations/department-type.model';

export interface IDepartment {
  id?: number;
  name?: string;
  type?: DepartmentType;
  description?: string;
  active?: boolean;
  doctors?: IDoctor[];
  companyName?: string;
  companyId?: number;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: string,
    public type?: DepartmentType,
    public description?: string,
    public active?: boolean,
    public doctors?: IDoctor[],
    public companyName?: string,
    public companyId?: number
  ) {
    this.active = this.active || false;
  }
}
