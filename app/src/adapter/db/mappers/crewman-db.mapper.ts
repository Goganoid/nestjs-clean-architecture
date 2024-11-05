import { Mapper } from 'src/application/mappers/api.mapper';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { CrewmanModel } from '../entities/crewman.model';

export class CrewmanDbMapper {
  static fromEntity: Mapper<CrewmanEntity, CrewmanModel> = ({
    birthDate,
    id,
    name,
    role,
    salary,
  }) => {
    const model = new CrewmanModel();
    model.id = id;
    model.birthDate = birthDate;
    model.name = name;
    model.role = role;
    model.salary = salary;
    return model;
  };
  static toEntity: Mapper<CrewmanModel, CrewmanEntity> = (model) => {
    return {
      birthDate: model.birthDate,
      id: model.id,
      name: model.name,
      role: model.role,
      salary: model.salary,
    };
  };
}
