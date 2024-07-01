import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SpaceshipCrewMessagePublisher } from 'src/application/interfaces/message-broker';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import {
  SPACESHIP_CREW_MESSAGE,
  SPACESHIP_CREW_QUEUE,
} from 'src/infrastructure/bull/queues';

@Injectable()
export class SpacehipCrewMessagePublisherImplementation
  implements SpaceshipCrewMessagePublisher
{
  constructor(
    @InjectQueue(SPACESHIP_CREW_QUEUE)
    private readonly queue: Queue,
  ) {}
  async publish(message: Message<SpaceshipCrewMessageData>) {
    await this.queue.add(SPACESHIP_CREW_MESSAGE, message);
  }
}
