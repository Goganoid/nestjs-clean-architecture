import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SpaceshipCrewMessagePublisher } from 'src/application/interfaces/events';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { SPACESHIP_CREW_ADDED_EVENT } from 'src/domain/events/spaceship-crew.events';

@Injectable()
export class SpacehipCrewMessagePublisherImplementation
  implements SpaceshipCrewMessagePublisher
{
  constructor(private eventEmitter: EventEmitter2) {}
  async publish(message: Message<SpaceshipCrewMessageData>) {
    await this.eventEmitter.emitAsync(SPACESHIP_CREW_ADDED_EVENT, message);
  }
}
