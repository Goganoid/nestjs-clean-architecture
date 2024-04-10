/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipModel } from '../../adapter/db/entities/spaceship.model';
import { ApiException } from '../../domain/base/api.exception';
import { CreateSpaceShipDTO } from '../../domain/dto/create-spaceship.dto';
import { SpaceshipRepositoryAbstract } from '../repositories/spaceship.abstract-repository';
import { ShipUseCases } from './ship.usecase';
import { MockSpaceshipRepository } from '../mocks/repository.mocks';

describe('ShipUseCases', () => {
  let service: ShipUseCases;
  let repository: SpaceshipRepositoryAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipUseCases,
        {
          provide: SpaceshipRepositoryAbstract,
          useClass: MockSpaceshipRepository,
        },
      ],
    }).compile();

    service = module.get<ShipUseCases>(ShipUseCases);
    repository = module.get<SpaceshipRepositoryAbstract>(
      SpaceshipRepositoryAbstract,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a spaceship', async () => {
    const dto: CreateSpaceShipDTO = {
      name: 'New Ship',
      armour: 1,
      jump: 1,
      maxFuel: 1,
      maxPower: 1,
      size: 1,
      thrust: 1,
    };
    const id = 'id';
    jest.spyOn(repository, 'existsWithName').mockResolvedValueOnce(false);
    jest.spyOn(repository, 'create').mockResolvedValue({
      ...dto,
      id,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    const result = await service.create(dto);

    expect(result.id).toEqual(id);
  });

  it('should throw an error if spaceship already exists', async () => {
    const dto: CreateSpaceShipDTO = {
      name: 'New Ship',
      armour: 1,
      jump: 1,
      maxFuel: 1,
      maxPower: 1,
      size: 1,
      thrust: 1,
    };
    jest.spyOn(repository, 'existsWithName').mockResolvedValueOnce(true);

    await expect(service.create(dto)).rejects.toThrow(ApiException);
  });

  it('should delete a spaceship', async () => {
    const dto = { id: '1' };
    const entity = {
      id: '1',
      name: 'Test 1',
      armour: 1,
      jump: 1,
      maxFuel: 1,
      maxPower: 1,
      size: 1,
      thrust: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    jest.spyOn(repository, 'remove').mockResolvedValue(entity);

    const result = await service.delete(dto);

    expect(result).toEqual(entity);
  });

  it('should update a spaceship', async () => {
    const id = '1';
    const dto = { name: 'Updated Ship' };
    const spy = jest.spyOn(repository, 'update');
    await service.update(id, dto);
    expect(spy).toHaveBeenCalledWith(id, dto);
  });

  it('should return a spaceship', async () => {
    const id = '1';
    const entity = {
      id,
      name: 'New Ship 2',
      armour: 2,
      jump: 2,
      maxFuel: 2,
      maxPower: 2,
      size: 2,
      thrust: 2,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const spy = jest.spyOn(repository, 'get').mockResolvedValue(entity);
    const result = await service.getOne({ id });
    expect(spy).toHaveBeenCalledWith(id);
    expect(result).toEqual(entity);
  });

  it('should throw not found', async () => {
    const id = '1';
    jest.spyOn(repository, 'get').mockResolvedValue(null);
    expect(service.getOne({ id })).rejects.toThrow(ApiException);
  });
});
