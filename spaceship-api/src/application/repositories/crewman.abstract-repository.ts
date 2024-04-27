import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { GenericRepository } from '../interfaces/generic-repository';

export abstract class CrewmanRepository extends GenericRepository<CrewmanEntity> {}
