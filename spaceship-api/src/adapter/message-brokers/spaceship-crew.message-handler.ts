import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SpaceshipCrewMessageHandler } from 'src/application/interfaces/message-broker';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { SPACESHIP_CREW_QUEUE } from 'src/infrastructure/bull/queues';

type Listener = (message: Message<SpaceshipCrewMessageData>) => void;

@Processor(SPACESHIP_CREW_QUEUE)
export class SpacehipCrewMessageHandlerImplementation
  extends WorkerHost
  implements SpaceshipCrewMessageHandler
{
  private readonly listeners: Listener[] = [];
  async process(job: Job<Message<SpaceshipCrewMessageData>>) {
    this.listeners.forEach((listener) => listener(job.data));
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }
}
