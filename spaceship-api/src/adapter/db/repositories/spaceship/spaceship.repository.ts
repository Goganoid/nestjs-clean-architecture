import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceshipRepositoryAbstract } from 'src/application/repositories/spaceship.abstract-repository';
import { DeepPartial, Repository } from 'typeorm';
import { SpaceshipModel } from '../../entities/spaceship.model';
import { ApiException } from 'src/domain/base/api.exception';
import { SpaceshipDbMapper } from '../../mappers/spaceship-db.mapper';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';

@Injectable()
export class SpaceshipRepository implements SpaceshipRepositoryAbstract {
  constructor(
    @InjectRepository(SpaceshipModel)
    private readonly spaceshipRepository: Repository<SpaceshipModel>,
  ) {}

  async remove(id: string) {
    const model = await this.spaceshipRepository.findOneBy({ id });
    if (!model) throw new ApiException('Spaceship not found', 404);
    return await this.spaceshipRepository.remove(model);
  }

  existsWithName(name: string) {
    return this.spaceshipRepository.existsBy({
      name: name,
    });
  }
  async getAll() {
    const ships = await this.spaceshipRepository.find();
    return ships.map((model) => SpaceshipDbMapper.toEntity(model));
  }
  async get(id: string) {
    const ship = await this.spaceshipRepository.findOneBy({ id });
    return ship ? SpaceshipDbMapper.toEntity(ship) : null;
  }
  async create(entity: SpaceshipEntity) {
    const created = await this.spaceshipRepository.save(
      SpaceshipDbMapper.fromEntity(entity),
    );
    return created.id;
  }
  async update(id: string, partialModel: DeepPartial<SpaceshipModel>) {
    const exists = await this.spaceshipRepository.existsBy({ id });
    if (!exists) throw new ApiException('Spaceship not found', 404);
    await this.spaceshipRepository.update(id, partialModel);
  }
}
