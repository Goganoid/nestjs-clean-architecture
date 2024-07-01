import { BaseEntity } from '../base/base.interface';
import { CrewmanRole } from '../enums/crewman-role.enum';

export class CrewmanEntity implements BaseEntity {
  id: string;
  name: string;
  role: CrewmanRole;
  birthDate: Date;
  salary: number;
  spaceshipId?: string;
}
