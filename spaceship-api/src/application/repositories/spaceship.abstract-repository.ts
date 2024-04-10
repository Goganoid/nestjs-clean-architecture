import { SpaceshipModel } from 'src/adapter/db/entities/spaceship.model';
import { GenericRepository } from '../interfaces/generic-repository';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';

export abstract class SpaceshipRepositoryAbstract extends GenericRepository<
  SpaceshipModel,
  SpaceshipEntity
> {
  abstract existsWithName(name: string): Promise<boolean>;
}
