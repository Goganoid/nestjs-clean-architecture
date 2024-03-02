import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipRepository } from './spaceship.repository';

describe('SpaceshipRepositoryService', () => {
  let service: SpaceshipRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceshipRepository],
    }).compile();

    service = module.get<SpaceshipRepository>(SpaceshipRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
