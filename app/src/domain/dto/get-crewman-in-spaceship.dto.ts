import { IsMongoId, IsUUID } from 'class-validator';
import { BasePresenterEntity } from '../base/base.interface';

export class CrewmanInSpaceshipDTO implements BasePresenterEntity {
  @IsMongoId()
  crewmanId: string;
  @IsUUID()
  shipId: string;
}
