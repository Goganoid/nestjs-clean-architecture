import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrewmanRepositoryAbstract } from 'src/application/repositories/crewman.abstract-repository';
import { ApiException } from 'src/domain/base/api.exception';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { CrewmanModel } from '../../entities/crewman.model';
import { CrewmanDbMapper } from '../../mappers/crewman-db.mapper';

@Injectable()
export class CrewmanRepository implements CrewmanRepositoryAbstract {
  constructor(
    @InjectModel(CrewmanModel.name) private crewmanModel: Model<CrewmanModel>,
  ) {}
  async getAll(): Promise<CrewmanEntity[]> {
    const models = await this.crewmanModel.find();
    const entities = models.map(CrewmanDbMapper.toEntity);
    return entities;
  }
  async get(id: string): Promise<CrewmanEntity | null> {
    const model = await this.crewmanModel.findById(id);
    if (model) return CrewmanDbMapper.toEntity(model);
    return null;
  }
  async create(item: CrewmanEntity): Promise<string> {
    const created = await this.crewmanModel.create(
      CrewmanDbMapper.fromEntity(item),
    );
    return created._id;
  }
  async update(id: string, item: Partial<CrewmanEntity>): Promise<void> {
    const exists = await this.crewmanModel.exists({ _id: id });
    if (!exists) throw new ApiException('Crewman not found', 404);
    await this.crewmanModel.findByIdAndUpdate(id, item);
  }
  async remove(id: string): Promise<CrewmanEntity> {
    const exists = await this.crewmanModel.exists({ _id: id });
    if (!exists) throw new ApiException('Crewman not found', 404);
    const removed = await this.crewmanModel.findByIdAndDelete(id);
    return CrewmanDbMapper.toEntity(removed!);
  }
}
