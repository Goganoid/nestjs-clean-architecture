import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceshipRepositoryAbstract } from 'src/application/repositories/spaceship.abstract-repository';
import { DeepPartial, Repository } from 'typeorm';
import { SpaceshipModel } from '../../entities/spaceship.model';
import { ApiException } from 'src/domain/base/api.exception';

@Injectable()
export class SpaceshipRepository implements SpaceshipRepositoryAbstract {
  constructor(
    @InjectRepository(SpaceshipModel)
    private readonly spaceshipRepository: Repository<SpaceshipModel>,
  ) {}

  async remove(id: string): Promise<SpaceshipModel> {
    const model = await this.spaceshipRepository.findOneBy({ id });
    if (!model) throw new ApiException('Spaceship not found', 404);
    return await this.spaceshipRepository.remove(model);
  }

  existsWithName(name: string): Promise<boolean> {
    return this.spaceshipRepository.existsBy({
      name: name,
    });
  }
  async getAll() {
    const ships = await this.spaceshipRepository.find();
    return ships;
  }
  async get(id: string) {
    const ship = await this.spaceshipRepository.findOneBy({ id });
    return ship;
  }
  async create(model: SpaceshipModel) {
    const created = await this.spaceshipRepository.save(model);
    return created;
  }
  async update(id: string, partialModel: DeepPartial<SpaceshipModel>) {
    const exists = await this.spaceshipRepository.existsBy({ id });
    if (!exists) throw new ApiException('Spaceship not found', 404);
    await this.spaceshipRepository.update(id, partialModel);
  }
}
