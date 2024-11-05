import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from 'src/application/interfaces/query';
import { CrewmanRepository } from 'src/application/repositories/crewman.abstract-repository';
import { ApiException } from 'src/domain/base/api.exception';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { Repository } from 'typeorm';
import { CrewmanModel } from '../../entities/crewman.model';
import { CrewmanDbMapper } from '../../mappers/crewman-db.mapper';

@Injectable()
export class CrewmanRepositoryImplementation implements CrewmanRepository {
  constructor(
    @InjectRepository(CrewmanModel)
    private readonly crewmanRepository: Repository<CrewmanModel>,
  ) {}

  async getWhere(query: Query<CrewmanEntity>): Promise<CrewmanEntity[]> {
    const typedQuery = query satisfies Query<CrewmanEntity & CrewmanModel>;
    const models = await this.crewmanRepository.find({
      where: typedQuery.where,
      relations: typedQuery.relations,
    });
    const entities = models.map(CrewmanDbMapper.toEntity);
    return entities;
  }
  async getOneWhere(
    query: Query<CrewmanEntity>,
  ): Promise<CrewmanEntity | null> {
    const typedQuery = query satisfies Query<CrewmanEntity & CrewmanModel>;
    const model = await this.crewmanRepository.findOne({
      where: typedQuery.where,
      relations: typedQuery.relations,
    });
    return model ? CrewmanDbMapper.toEntity(model) : null;
  }
  async getAll(): Promise<CrewmanEntity[]> {
    const models = await this.crewmanRepository.find();
    const entities = models.map(CrewmanDbMapper.toEntity);
    return entities;
  }
  async get(id: string): Promise<CrewmanEntity | null> {
    const model = await this.crewmanRepository.findOneBy({ id });
    return model ? CrewmanDbMapper.toEntity(model) : null;
  }
  async create(item: CrewmanEntity) {
    const created = await this.crewmanRepository.save(
      CrewmanDbMapper.fromEntity(item),
    );
    return CrewmanDbMapper.toEntity(created);
  }
  async update(id: string, item: Partial<CrewmanEntity>): Promise<void> {
    const exists = await this.crewmanRepository.existsBy({ id: id });
    if (!exists) throw new ApiException('Crewman not found', 404);
    await this.crewmanRepository.update(id, item);
  }
  async remove(id: string): Promise<CrewmanEntity> {
    const entity = await this.crewmanRepository.findOneBy({ id: id });
    if (!entity) throw new ApiException('Crewman not found', 404);
    await this.crewmanRepository.remove(entity);
    return CrewmanDbMapper.toEntity(entity);
  }
}
