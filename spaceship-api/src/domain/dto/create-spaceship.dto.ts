import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { BasePresenterEntity } from '../base/base.interface';

export class CreateSpaceShipDTO implements BasePresenterEntity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  size: number;

  @IsNumber()
  @IsPositive()
  armour: number;

  @IsNumber()
  @IsPositive()
  thrust: number;

  @IsNumber()
  @IsPositive()
  jump: number;

  @IsNumber()
  @IsPositive()
  maxPower: number;

  @IsNumber()
  @IsPositive()
  maxFuel: number;
}
