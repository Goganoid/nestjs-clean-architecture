import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BasePresenterEntity } from '../base/base.interface';
import { CrewmanRole } from '../enums/crewman-role.enum';

export class CreateCrewmanDTO implements BasePresenterEntity {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(CrewmanRole)
  role: CrewmanRole;
  @IsDateString()
  birthDate: string;
  @IsNumber()
  salary: number;
  @IsString()
  shipId: string;
}
