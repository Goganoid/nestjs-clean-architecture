import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiException } from 'src/domain/base/api.exception';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import { Repository } from 'typeorm';
import { SpaceshipModel } from '../../entities/spaceship.model';
import { SpaceshipRepositoryImplementation } from './spaceship.repository';
import { repositoryMockFactory } from 'src/infrastructure/tests/repository-mock-factory';

describe('SpaceshipRepository', () => {
  let repository: SpaceshipRepositoryImplementation;
  let spaceshipModelRepository: Repository<SpaceshipModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpaceshipRepositoryImplementation,
        {
          provide: getRepositoryToken(SpaceshipModel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    repository = module.get<SpaceshipRepositoryImplementation>(
      SpaceshipRepositoryImplementation,
    );
    spaceshipModelRepository = module.get<Repository<SpaceshipModel>>(
      getRepositoryToken(SpaceshipModel),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('remove', () => {
    it('should remove a spaceship by id', async () => {
      const findOneSpy = jest.spyOn(spaceshipModelRepository, 'findOneBy');
      const model = new SpaceshipModel();
      model.id = '1';
      findOneSpy.mockResolvedValueOnce(model);

      const removeSpy = jest.spyOn(spaceshipModelRepository, 'remove');

      await repository.remove('1');

      expect(findOneSpy).toHaveBeenCalledWith({ id: '1' });
      expect(removeSpy).toHaveBeenCalled();
    });

    it('should throw an exception if spaceship not found', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'findOne')
        .mockResolvedValueOnce(null);

      await expect(repository.remove('1')).rejects.toThrow(ApiException);
    });
  });

  describe('existsWithName', () => {
    it('should return true if spaceship with given name exists', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'existsBy')
        .mockResolvedValueOnce(true);

      const result = await repository.existsWithName('Test');

      expect(result).toBe(true);
    });

    it('should return false if spaceship with given name does not exist', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'existsBy')
        .mockResolvedValueOnce(false);

      const result = await repository.existsWithName('Test');

      expect(result).toBe(false);
    });
  });

  describe('get', () => {
    it('should return a spaceship entity by id', async () => {
      const expectedEntity: SpaceshipEntity = new SpaceshipEntity();
      const foundModel = new SpaceshipModel();
      foundModel.id = '1';
      expectedEntity.id = '1';
      jest
        .spyOn(spaceshipModelRepository, 'findOneBy')
        .mockResolvedValueOnce(foundModel);

      const result = await repository.get('1');

      expect(result).toEqual(expectedEntity);
    });

    it('should return null if spaceship with given id does not exist', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'findOneBy')
        .mockResolvedValueOnce(null);

      const result = await repository.get('1');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a spaceship entity by id', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'existsBy')
        .mockResolvedValueOnce(true);
      const partialModel = { name: 'Updated Test' };

      await repository.update('1', partialModel);

      expect(spaceshipModelRepository.update).toHaveBeenCalledWith(
        '1',
        partialModel,
      );
    });

    it('should throw an exception if spaceship with given id does not exist', async () => {
      jest
        .spyOn(spaceshipModelRepository, 'existsBy')
        .mockResolvedValueOnce(false);

      await expect(repository.update('1', {})).rejects.toThrowError(
        ApiException,
      );
    });
  });
});
