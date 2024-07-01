import { Injectable, OnModuleInit } from '@nestjs/common';
import { SpaceshipCrewMessageHandler } from '../interfaces/message-broker';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { CrewmanRepository } from '../repositories/crewman.abstract-repository';
import { Message } from 'src/domain/base/message';

@Injectable()
export class CrewAddedUseCase implements OnModuleInit {
  constructor(
    private readonly queueHandler: SpaceshipCrewMessageHandler,
    private readonly crewmanRepository: CrewmanRepository,
  ) {}
  onModuleInit() {
    this.queueHandler.subscribe((message) => this.handle(message));
  }

  public async handle(message: Message<SpaceshipCrewMessageData>) {
    await this.crewmanRepository.update(message.data.crewmanId, {
      spaceshipId: message.data.spaceshipId,
    });
  }
}
