import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { DeleteCrewmanDTO } from 'src/domain/dto/delete-crewman.dto';
import { IdDTO } from 'src/domain/dto/id.dto';
import { UpdateCrewmanDTO } from 'src/domain/dto/update-crewman.dto';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { CrewmanRepositoryAbstract } from '../repositories/crewman.abstract-repository';
import { SpaceshipRepositoryAbstract } from '../repositories/spaceship.abstract-repository';

@Injectable()
export class CrewmanUseCases {
  constructor(
    private readonly crewmanRepository: CrewmanRepositoryAbstract,
    private readonly spaceshipRepository: SpaceshipRepositoryAbstract,
  ) {}

  async getAll(): Promise<CrewmanEntity[]> {
    const entities = await this.crewmanRepository.getAll();
    return entities;
  }

  async getOne({ id }: IdDTO): Promise<CrewmanEntity> {
    const entity = await this.crewmanRepository.get(id);
    if (!entity) throw new ApiException('Spaceship not found', 404);
    return entity;
  }

  async create(dto: CreateCrewmanDTO) {
    const entity = new CrewmanEntity();
    entity.birthDate = new Date(dto.birthDate);
    entity.name = dto.name;
    entity.role = dto.role;
    entity.salary = dto.salary;
    entity.shipId = dto.shipId;

    const spaceship = await this.spaceshipRepository.get(entity.shipId);
    if (!spaceship) {
      throw new ApiException(
        `A spaceship with id ${entity.shipId} does not exist`,
      );
    }

    const created = await this.crewmanRepository.create(entity);
    return created;
  }

  async delete(dto: DeleteCrewmanDTO): Promise<CrewmanEntity> {
    const entity = await this.crewmanRepository.remove(dto.id);
    return entity;
  }

  async update(id: string, dto: UpdateCrewmanDTO): Promise<void> {
    await this.crewmanRepository.update(id, dto);
  }
}
