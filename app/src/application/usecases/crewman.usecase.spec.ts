import { Test, TestingModule } from '@nestjs/testing';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';
import {
  MockCrewmanRepository,
  MockSpaceshipRepository,
} from '../mocks/repository.mocks';
import { CrewmanRepository } from '../repositories/crewman.abstract-repository';
import { SpaceshipRepository } from '../repositories/spaceship.abstract-repository';
import { CrewmanUseCases } from './crewman.usecase';

describe('CrewmanUseCases', () => {
  let service: CrewmanUseCases;
  let crewmanRepository: CrewmanRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewmanUseCases,
        {
          provide: CrewmanRepository,
          useClass: MockCrewmanRepository,
        },
        {
          provide: SpaceshipRepository,
          useClass: MockSpaceshipRepository,
        },
      ],
    }).compile();

    service = module.get<CrewmanUseCases>(CrewmanUseCases);
    crewmanRepository = module.get<CrewmanRepository>(CrewmanRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a crewman', async () => {
    const id = 'id';
    const dto: CreateCrewmanDTO = {
      name: 'New Ship',
      birthDate: new Date().toString(),
      role: CrewmanRole.CAPTAIN,
      salary: 500,
    };
    const createdEntity = new CrewmanEntity();
    createdEntity.id = id;
    jest.spyOn(crewmanRepository, 'create').mockResolvedValue(createdEntity);

    const result = await service.create(dto);

    expect(result.id).toEqual(id);
  });
});
