import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateSpaceshipDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  size?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  armour?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  thrust?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  jump?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  maxPower?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  maxFuel?: number;
}
