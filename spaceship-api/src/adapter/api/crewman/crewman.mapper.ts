import { Mapper } from 'src/application/mappers/api.mapper';
import { CrewmanDTO } from 'src/domain/dto/crewman.dto';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';

export class CrewmanMapper {
  static toApi: Mapper<CrewmanEntity, CrewmanDTO> = (entity) => entity;
}
