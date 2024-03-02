import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipController } from './spaceship.controller';

describe('SpaceshipController', () => {
  let controller: SpaceshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceshipController],
    }).compile();

    controller = module.get<SpaceshipController>(SpaceshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
