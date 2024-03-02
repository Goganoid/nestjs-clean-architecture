import { BasePresenterEntity } from '../base/base.interface';

export class SpaceshipDTO extends BasePresenterEntity {
  id: string;
  name: string;
  size: number;
  armour: number;
  thrust: number;
  jump: number;
  maxPower: number;
  maxFuel: number;
}
