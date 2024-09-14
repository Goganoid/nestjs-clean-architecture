import { FilterQuery } from 'mongoose';
import { CrewmanModel } from 'src/adapter/db/entities/crewman.model';
import { Query } from 'src/application/interfaces/query';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';

export const mapQuery = (
  query: Query<CrewmanEntity>,
): FilterQuery<CrewmanModel> => {
  if (query.relations)
    throw new Error('MongoDB does not support "relations" parameter');
  return {
    name: query.where.name,
    birthDate: query.where.birthDate,
    role: query.where.role,
    salary: query.where.salary,
    _id: query.where.id,
    spaceshipId: query.where.spaceshipId,
  };
};
