/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCrewmanDTO } from 'src/domain/dto/create-crewman.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';
import { ApiException } from '../../domain/base/api.exception';
import {
  MockCrewmanRepository,
  MockSpaceshipRepository,
} from '../mocks/repository.mocks';
import { CrewmanRepositoryAbstract } from '../repositories/crewman.abstract-repository';
import { SpaceshipRepositoryAbstract } from '../repositories/spaceship.abstract-repository';
import { CrewmanUseCases } from './crewman.usecase';
import { CrewmanModel } from 'src/adapter/db/entities/crewman.model';
import { CrewmanEntity } from 'src/domain/entities/crewman.entity';

describe('CrewmanUseCases', () => {
  let service: CrewmanUseCases;
  let crewmanRepository: CrewmanRepositoryAbstract;
  let spaceshipRepository: SpaceshipRepositoryAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewmanUseCases,
        {
          provide: CrewmanRepositoryAbstract,
          useClass: MockCrewmanRepository,
        },
        {
          provide: SpaceshipRepositoryAbstract,
          useClass: MockSpaceshipRepository,
        },
      ],
    }).compile();

    service = module.get<CrewmanUseCases>(CrewmanUseCases);
    crewmanRepository = module.get<CrewmanRepositoryAbstract>(
      CrewmanRepositoryAbstract,
    );
    spaceshipRepository = module.get<SpaceshipRepositoryAbstract>(
      SpaceshipRepositoryAbstract,
    );
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
      shipId: 'someId',
    };
    const createdEntity = new CrewmanEntity();
    createdEntity.id = id;
    jest
      .spyOn(spaceshipRepository, 'get')
      .mockResolvedValueOnce(new SpaceshipEntity());
    jest.spyOn(crewmanRepository, 'create').mockResolvedValue(createdEntity);

    const result = await service.create(dto);

    expect(result.id).toEqual(id);
  });

  it('should throw an error if spaceshipId does not exist', async () => {
    const dto: CreateCrewmanDTO = {
      name: 'New Ship',
      birthDate: new Date().toString(),
      role: CrewmanRole.CAPTAIN,
      salary: 500,
      shipId: 'someId',
    };
    jest.spyOn(spaceshipRepository, 'get').mockResolvedValueOnce(null);

    await expect(service.create(dto)).rejects.toThrow(ApiException);
  });
});
