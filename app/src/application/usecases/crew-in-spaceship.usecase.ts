import { Injectable } from '@nestjs/common';
import { CrewmanRepository } from 'src/application/repositories/crewman.abstract-repository';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { SpaceshipCrewMessagePublisher } from '../interfaces/message-broker';
import { CrewmanUseCases } from './crewman.usecase';

@Injectable()
export class CrewInSpaceshipUseCases {
  constructor(
    private readonly crewmanRepository: CrewmanRepository,
    private readonly crewmanUseCases: CrewmanUseCases,
    private readonly messagePublisher: SpaceshipCrewMessagePublisher,
  ) {}

  async getByShip(shipId: string, crewmanId: string): Promise<CrewmanEntity> {
    const crewman = await this.crewmanRepository.getOneWhere({
      where: { id: crewmanId, spaceshipId: shipId },
    });
    if (!crewman) {
      throw new ApiException('Crewman not found ', 404);
    }
    return crewman;
  }

  async deleteByShip(
    shipId: string,
    crewmanId: string,
  ): Promise<CrewmanEntity> {
    const entity = await this.crewmanRepository.getOneWhere({
      where: { id: crewmanId, spaceshipId: shipId },
    });
    if (entity) {
      const crewman = await this.crewmanRepository.remove(crewmanId);
      return crewman;
    }
    throw new ApiException('Crewman not found ', 404);
  }
  async createByShip(
    shipId: string,
    dto: CreateCrewmanDTO,
  ): Promise<CrewmanEntity> {
    const crewman = await this.crewmanUseCases.create(dto);
    await this.messagePublisher.publish({
      createdDate: new Date(),
      data: { crewmanId: crewman.id, spaceshipId: shipId },
    });
    return crewman;
  }
}
