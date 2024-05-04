import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import {
  SpaceshipCrewMessageHandler,
  SpaceshipCrewMessagePublisher,
} from 'src/application/interfaces/message-broker';
import { SPACESHIP_CREW_QUEUE } from 'src/infrastructure/bull/queues';
import { SpacehipCrewMessageHandlerImplementation } from './spaceship-crew.message-handler';
import { SpacehipCrewMessagePublisherImplementation } from './spaceship-crew.message-publisher';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SPACESHIP_CREW_QUEUE,
    }),
  ],
  providers: [
    {
      provide: SpaceshipCrewMessageHandler,
      useClass: SpacehipCrewMessageHandlerImplementation,
    },
    {
      provide: SpaceshipCrewMessagePublisher,
      useClass: SpacehipCrewMessagePublisherImplementation,
    },
  ],
  exports: [SpaceshipCrewMessageHandler, SpaceshipCrewMessagePublisher],
})
export class MessageBrokersModule {}
