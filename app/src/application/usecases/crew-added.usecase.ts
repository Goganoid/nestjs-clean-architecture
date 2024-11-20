import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { SpaceshipCrewMessageSubscriber } from '../interfaces/events';

@Injectable()
export class CrewAddedUseCase implements OnModuleInit {
  logger = new Logger(CrewAddedUseCase.name);
  constructor(private readonly queueHandler: SpaceshipCrewMessageSubscriber) {}
  onModuleInit() {
    this.queueHandler.subscribe((message) => this.handle(message));
  }

  public async handle(message: Message<SpaceshipCrewMessageData>) {
    this.logger.log('Received message', message);
  }
}
