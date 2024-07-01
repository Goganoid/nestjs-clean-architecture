import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';

export abstract class MessagePublisher<T> {
  abstract publish(message: Message<T>): Promise<void>;
}

export abstract class MessageHandler<T> {
  abstract subscribe(listener: (message: Message<T>) => Promise<void>);
}

export abstract class SpaceshipCrewMessagePublisher extends MessagePublisher<SpaceshipCrewMessageData> {}
export abstract class SpaceshipCrewMessageHandler extends MessageHandler<SpaceshipCrewMessageData> {}
