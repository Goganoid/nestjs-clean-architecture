import { Mapper } from 'src/application/mappers/api.mapper';
import { SpaceshipDTO } from 'src/domain/dto/spaceship.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';

export const spaceshipEntityToApi: Mapper<SpaceshipEntity, SpaceshipDTO> = ({
  armour,
  id,
  jump,
  maxFuel,
  maxPower,
  name,
  size,
  thrust,
}) => ({
  armour,
  id,
  jump,
  maxFuel,
  maxPower,
  name,
  size,
  thrust,
});
