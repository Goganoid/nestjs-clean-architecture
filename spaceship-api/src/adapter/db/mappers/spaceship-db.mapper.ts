import { Mapper } from 'src/application/mappers/api.mapper';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { SpaceshipModel } from '../entities/spaceship.model';

export class SpaceshipDbMapper {
  static fromEntity: Mapper<SpaceshipEntity, SpaceshipModel> = ({
    armour,
    jump,
    maxFuel,
    maxPower,
    name,
    size,
    thrust,
    createdDate,
    updatedDate,
  }) => {
    const model = new SpaceshipModel();
    model.name = name;
    model.size = size;
    model.thrust = thrust;
    model.armour = armour;
    model.jump = jump;
    model.maxFuel = maxFuel;
    model.maxPower = maxPower;
    model.createdDate = createdDate;
    model.updatedDate = updatedDate;
    return model;
  };
  static toEntity: Mapper<SpaceshipModel, SpaceshipEntity> = (model) => {
    return {
      armour: model.armour,
      id: model.id,
      jump: model.jump,
      maxFuel: model.maxFuel,
      maxPower: model.maxPower,
      name: model.name,
      size: model.size,
      thrust: model.thrust,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
    };
  };
}
