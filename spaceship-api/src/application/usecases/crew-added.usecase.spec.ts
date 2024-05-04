import { TestBed } from '@automock/jest';
import { Message } from 'src/domain/base/message';
import { SpaceshipCrewMessageData } from 'src/domain/dto/spaceship-crew-message.dto';
import { SpaceshipCrewMessageHandler } from '../interfaces/message-broker';
import { CrewmanRepository } from '../repositories/crewman.abstract-repository';
import { CrewAddedUseCase } from './crew-added.usecase';

describe('CrewmanUseCases', () => {
  let service: CrewAddedUseCase;
  let crewmanRepository: jest.Mocked<CrewmanRepository>;
  let messageHandler: jest.Mocked<SpaceshipCrewMessageHandler>;

  let listener:
    | ((message: Message<SpaceshipCrewMessageData>) => Promise<void>)
    | undefined;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CrewAddedUseCase).compile();
    service = unit;
    listener = undefined;
    crewmanRepository = unitRef.get(CrewmanRepository as any);
    messageHandler = unitRef.get(SpaceshipCrewMessageHandler as any);
    messageHandler.subscribe.mockImplementation((newListener) => {
      listener = newListener;
    });
    unit.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle message', async () => {
    expect(listener).toBeDefined();
    await listener?.({
      createdDate: new Date(),
      data: { crewmanId: 'crewman', spaceshipId: 'spaceship' },
    });
    expect(crewmanRepository.update).toHaveBeenCalledWith(
      'crewman',
      expect.objectContaining({ spaceshipId: 'spaceship' }),
    );
  });
});
