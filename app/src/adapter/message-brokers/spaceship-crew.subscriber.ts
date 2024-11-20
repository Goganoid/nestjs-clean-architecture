import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SpaceshipCrewMessageSubscriber } from 'src/application/interfaces/events';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { SPACESHIP_CREW_ADDED_EVENT } from 'src/domain/events/spaceship-crew.events';

type Listener = (message: Message<SpaceshipCrewMessageData>) => void;

@Injectable()
export class SpacehipCrewMessageSubscriberImplementation
  implements SpaceshipCrewMessageSubscriber
{
  private readonly listeners: Listener[] = [];

  @OnEvent(SPACESHIP_CREW_ADDED_EVENT)
  async process(message: Message<SpaceshipCrewMessageData>) {
    this.listeners.forEach((listener) => listener(message));
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }
}
