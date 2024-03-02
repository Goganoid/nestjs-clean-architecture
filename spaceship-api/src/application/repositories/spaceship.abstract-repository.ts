import { SpaceshipModel } from 'src/adapter/db/entities/spaceship.model';
import { GenericRepository } from '../interfaces/generic-repository';

export abstract class SpaceshipRepositoryAbstract extends GenericRepository<SpaceshipModel> {
  abstract existsWithName(name: string): Promise<boolean>;
}
