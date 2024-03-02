import { Injectable } from '@nestjs/common';
import { SpaceshipModel } from 'src/adapter/db/entities/spaceship.model';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateSpaceShipDTO } from 'src/domain/dto/create-spaceship.dto';
import { DeleteSpaceshipDTO } from 'src/domain/dto/delete-spaceship.dto';
import { UpdateSpaceshipDTO } from 'src/domain/dto/update-spaceship.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { SpaceshipRepositoryAbstract } from '../repositories/spaceship.abstract-repository';

@Injectable()
export class ShipUseCases {
  constructor(private readonly repository: SpaceshipRepositoryAbstract) {}

  async getAll(): Promise<SpaceshipEntity[]> {
    const models = await this.repository.getAll();
    return models.map((m) => m.toEntity());
  }

  async create(dto: CreateSpaceShipDTO): Promise<SpaceshipEntity> {
    const model = new SpaceshipModel().fromDTO(dto);
    if (await this.repository.existsWithName(dto.name)) {
      throw new ApiException(
        `A spaceship with name ${model.name} already exists`,
      );
    }

    const created = await this.repository.create(model);
    return created.toEntity();
  }

  async delete(dto: DeleteSpaceshipDTO): Promise<SpaceshipEntity> {
    const model = await this.repository.remove(dto.id);
    return model.toEntity();
  }

  async update(id: string, dto: UpdateSpaceshipDTO): Promise<void> {
    await this.repository.update(id, dto);
  }
}
