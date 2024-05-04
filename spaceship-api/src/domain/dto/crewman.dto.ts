import { BasePresenterEntity } from '../base/base.interface';
import { CrewmanRole } from '../enums/crewman-role.enum';

export class CrewmanDTO implements BasePresenterEntity {
  id: string;
  name: string;
  role: CrewmanRole;
  birthDate: Date;
  salary: number;
}
