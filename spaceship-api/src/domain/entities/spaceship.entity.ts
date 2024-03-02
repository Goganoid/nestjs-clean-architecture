import { BaseEntity } from '../base/base.interface';

export class SpaceshipEntity implements BaseEntity {
  id: string;
  name: string;
  size: number;
  armour: number;
  thrust: number;
  jump: number;
  maxPower: number;
  maxFuel: number;
  createdDate: Date;
  updatedDate: Date;
}
