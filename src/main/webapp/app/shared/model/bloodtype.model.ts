export interface IBloodtype {
  id?: number;
  name?: string;
  code?: number;
}

export class Bloodtype implements IBloodtype {
  constructor(public id?: number, public name?: string, public code?: number) {}
}
