import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { GenericRepository } from '../interfaces/generic-repository';

export abstract class SpaceshipRepository extends GenericRepository<SpaceshipEntity> {
  abstract existsWithName(name: string): Promise<boolean>;
}
