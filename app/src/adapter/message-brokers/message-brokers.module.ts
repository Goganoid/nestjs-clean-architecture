import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  SpaceshipCrewMessagePublisher,
  SpaceshipCrewMessageSubscriber,
} from 'src/application/interfaces/events';
import { SpacehipCrewMessagePublisherImplementation } from './spaceship-crew.publisher';
import { SpacehipCrewMessageSubscriberImplementation } from './spaceship-crew.subscriber';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: SpaceshipCrewMessageSubscriber,
      useClass: SpacehipCrewMessageSubscriberImplementation,
    },
    {
      provide: SpaceshipCrewMessagePublisher,
      useClass: SpacehipCrewMessagePublisherImplementation,
    },
  ],
  exports: [SpaceshipCrewMessageSubscriber, SpaceshipCrewMessagePublisher],
})
export class EventsModule {}
