import { Mapper } from 'src/application/mappers/api.mapper';
import { SpaceshipDTO } from 'src/domain/dto/spaceship.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';

export class SpaceshipMapper {
  static toApi: Mapper<SpaceshipEntity, SpaceshipDTO> = ({
    armour,
    jump,
    maxFuel,
    maxPower,
    name,
    id,
    size,
    thrust,
  }) => ({
    id,
    armour,
    jump,
    maxFuel,
    maxPower,
    name,
    size,
    thrust,
  });
}
