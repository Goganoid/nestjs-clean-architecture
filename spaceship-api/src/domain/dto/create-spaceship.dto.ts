import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { BasePresenterEntity } from '../base/base.interface';

export class CreateSpaceShipDTO implements BasePresenterEntity {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10e4)
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
