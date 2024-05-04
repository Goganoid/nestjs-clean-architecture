import { BlobClient } from 'src/application/interfaces/blob-client';
import { CrewmanRepository } from 'src/application/repositories/crewman.abstract-repository';
import { ApiException } from 'src/domain/base/api.exception';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { CrewmanUseCases } from './crewman.usecase';
import { Injectable } from '@nestjs/common';
import { SpaceshipCrewMessagePublisher } from '../interfaces/message-broker';

@Injectable()
export class CrewInSpaceshipUseCases {
  constructor(
    private readonly crewmanRepository: CrewmanRepository,
    private readonly crewmanUseCases: CrewmanUseCases,
    private readonly blobClient: BlobClient,
    private readonly messagePublisher: SpaceshipCrewMessagePublisher,
  ) {}

  private getFileName(shipId: string, crewmanId: string) {
    return `SHIP-${shipId}-CREWMAN-${crewmanId}`;
  }

  async getByShip(shipId: string, crewmanId: string): Promise<CrewmanEntity> {
    const relationName = this.getFileName(shipId, crewmanId);
    const relationExists = await this.blobClient.fileExists(relationName);
    if (relationExists) {
      const crewman = await this.crewmanRepository.get(crewmanId);
      if (!crewman) {
        await this.blobClient.deleteFile(relationName);
        throw new ApiException('Crewman not found ', 404);
      }
      return crewman;
    }
    throw new ApiException('Crewman not found ', 404);
  }
  async deleteByShip(
    shipId: string,
    crewmanId: string,
  ): Promise<CrewmanEntity> {
    const relationName = this.getFileName(shipId, crewmanId);
    const relationExists = await this.blobClient.fileExists(relationName);
    if (relationExists) {
      await this.blobClient.deleteFile(relationName);
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
    const relationName = this.getFileName(shipId, crewman.id);
    await this.blobClient.createFile(relationName);
    await this.messagePublisher.publish({
      createdDate: new Date(),
      data: { crewmanId: crewman.id, spaceshipId: shipId },
    });
    return crewman;
  }
}
