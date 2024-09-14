import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceshipRepository } from 'src/application/repositories/spaceship.abstract-repository';
import { DeepPartial, Repository } from 'typeorm';
import { SpaceshipModel } from '../../entities/spaceship.model';
import { ApiException } from 'src/domain/base/api.exception';
import { SpaceshipDbMapper } from '../../mappers/spaceship-db.mapper';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { Query } from 'src/application/interfaces/query';

@Injectable()
export class SpaceshipRepositoryImplementation implements SpaceshipRepository {
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
  async getOneWhere(query: Query<SpaceshipEntity>) {
    const typedQuery = query satisfies Query<SpaceshipEntity & SpaceshipModel>;
    const ship = await this.spaceshipRepository.findOne({
      where: typedQuery.where,
      relations: typedQuery.relations,
    });
    return ship ? SpaceshipDbMapper.toEntity(ship) : null;
  }
  async getWhere(query: Query<SpaceshipEntity>) {
    const typedQuery = query satisfies Query<SpaceshipEntity & SpaceshipModel>;
    const ships = await this.spaceshipRepository.find({
      where: typedQuery.where,
      relations: typedQuery.relations,
    });
    return ships.map((model) => SpaceshipDbMapper.toEntity(model));
  }
  async create(entity: SpaceshipEntity) {
    const created = await this.spaceshipRepository.save(
      SpaceshipDbMapper.fromEntity(entity),
    );
    return SpaceshipDbMapper.toEntity(created);
  }
  async update(id: string, partialModel: DeepPartial<SpaceshipEntity>) {
    const exists = await this.spaceshipRepository.existsBy({ id });
    if (!exists) throw new ApiException('Spaceship not found', 404);
    await this.spaceshipRepository.update(id, partialModel);
  }
}
