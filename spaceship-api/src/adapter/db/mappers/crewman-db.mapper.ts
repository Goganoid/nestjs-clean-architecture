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
    shipId,
  }) => {
    const model = new CrewmanModel();
    model._id = id;
    model.birthDate = birthDate;
    model.name = name;
    model.role = role;
    model.salary = salary;
    model.shipId = shipId;
    return model;
  };
  static toEntity: Mapper<CrewmanModel, CrewmanEntity> = (model) => {
    return {
      birthDate: model.birthDate,
      id: model._id,
      name: model.name,
      role: model.role,
      salary: model.salary,
      shipId: model.shipId,
    };
  };
}
