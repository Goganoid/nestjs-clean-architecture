import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiException } from 'src/domain/base/api.exception';
import { repositoryMockFactory } from 'src/infrastructure/tests/repository-mock-factory';
import { Repository } from 'typeorm';
import { CrewmanModel } from '../../entities/crewman.model';
import { CrewmanRepositoryImplementation } from './crewman.repository';

describe('CrewmanRepository', () => {
  let repository: CrewmanRepositoryImplementation;
  let crewmanModelRepository: Repository<CrewmanModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewmanRepositoryImplementation,
        {
          provide: getRepositoryToken(CrewmanModel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    repository = module.get<CrewmanRepositoryImplementation>(
      CrewmanRepositoryImplementation,
    );
    crewmanModelRepository = module.get<Repository<CrewmanModel>>(
      getRepositoryToken(CrewmanModel),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('remove', () => {
    it('should remove a crewmany by id', async () => {
      const id = 'id';
      const findOneSpy = jest.spyOn(crewmanModelRepository, 'findOneBy');

      const model = new CrewmanModel();
      model.id = id;
      findOneSpy.mockResolvedValueOnce(model);

      const removeSpy = jest
        .spyOn(crewmanModelRepository, 'remove')
        .mockResolvedValue(model);

      const result = await repository.remove(id);
      expect(removeSpy).toHaveBeenCalled();
      expect(result?.id).toBe(id);
    });

    it('should throw an exception if crewman not found', async () => {
      jest.spyOn(crewmanModelRepository, 'findOneBy').mockResolvedValue(null);

      await expect(repository.remove('1')).rejects.toThrow(ApiException);
    });
  });

  describe('get', () => {
    it('should return a crewman entity by id', async () => {
      const expectedModel: CrewmanModel = new CrewmanModel();
      expectedModel.id = '1';
      jest
        .spyOn(crewmanModelRepository, 'findOneBy')
        .mockResolvedValueOnce(expectedModel);

      const result = await repository.get('1');
      expect(result?.id).toEqual(expectedModel.id);
    });

    it('should return null if crewman with given id does not exist', async () => {
      jest
        .spyOn(crewmanModelRepository, 'findOneBy')
        .mockResolvedValueOnce(null);

      const result = await repository.get('1');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a crewman entity by id', async () => {
      const id = 'id';
      jest
        .spyOn(crewmanModelRepository, 'existsBy')
        .mockResolvedValueOnce(true);
      const partialModel = { name: 'Updated Test' };

      await repository.update(id, partialModel);

      expect(crewmanModelRepository.update).toHaveBeenCalledWith(
        id,
        partialModel,
      );
    });

    it('should throw an exception if spaceship with given id does not exist', async () => {
      jest
        .spyOn(crewmanModelRepository, 'existsBy')
        .mockResolvedValueOnce(false);

      await expect(repository.update('1', {})).rejects.toThrow(ApiException);
    });
  });
});
