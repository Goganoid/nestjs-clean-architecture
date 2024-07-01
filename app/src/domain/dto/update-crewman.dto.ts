import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CrewmanRole } from '../enums/crewman-role.enum';

export class UpdateCrewmanDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEnum(CrewmanRole)
  @IsOptional()
  role: CrewmanRole;

  @IsDateString()
  @IsOptional()
  birthDate: string;

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsString()
  @IsOptional()
  shipId: string;
}
