import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateSpaceShipDTO } from 'src/domain/dto/create-spaceship.dto';
import { DeleteSpaceshipDTO } from 'src/domain/dto/delete-spaceship.dto';
import { UpdateSpaceshipDTO } from 'src/domain/dto/update-spaceship.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { SpaceshipRepository } from '../repositories/spaceship.abstract-repository';
import { IdDTO } from 'src/domain/dto/id.dto';

@Injectable()
export class ShipUseCases {
  constructor(private readonly repository: SpaceshipRepository) {}

  async getAll(): Promise<SpaceshipEntity[]> {
    const entities = await this.repository.getAll();
    return entities;
  }

  async getOne({ id }: IdDTO): Promise<SpaceshipEntity> {
    const entity = await this.repository.get(id);
    if (!entity) throw new ApiException('Spaceship not found', 404);
    return entity;
  }

  async create(dto: CreateSpaceShipDTO): Promise<SpaceshipEntity> {
    const entity = new SpaceshipEntity();
    entity.armour = dto.armour;
    entity.jump = dto.jump;
    entity.maxFuel = dto.maxFuel;
    entity.maxPower = dto.maxPower;
    entity.name = dto.name;
    entity.size = dto.size;
    entity.thrust = dto.thrust;
    entity.createdDate = new Date();
    entity.updatedDate = new Date();
    if (await this.repository.existsWithName(dto.name)) {
      throw new ApiException(
        `A spaceship with name ${dto.name} already exists`,
      );
    }

    return await this.repository.create(entity);
  }

  async delete(dto: DeleteSpaceshipDTO): Promise<SpaceshipEntity> {
    const entity = await this.repository.remove(dto.id);
    return entity;
  }

  async update(id: string, dto: UpdateSpaceshipDTO): Promise<void> {
    await this.repository.update(id, dto);
  }
}
