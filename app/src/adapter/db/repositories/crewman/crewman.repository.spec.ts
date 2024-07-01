import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ApiException } from 'src/domain/base/api.exception';
import { MockType } from 'src/infrastructure/tests/types';
import { CrewmanModel } from '../../entities/crewman.model';
import { CrewmanRepositoryImplementation } from './crewman.repository';

const repositoryMockFactory: () => MockType<Model<any>> = jest.fn(() => ({
  exists: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findById: jest.fn(),
}));

describe('CrewmanRepository', () => {
  let repository: CrewmanRepositoryImplementation;
  let mongooseModel: Model<CrewmanModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewmanRepositoryImplementation,
        {
          provide: getModelToken(CrewmanModel.name),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    repository = module.get<CrewmanRepositoryImplementation>(
      CrewmanRepositoryImplementation,
    );
    mongooseModel = module.get<Model<CrewmanModel>>(
      getModelToken(CrewmanModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('remove', () => {
    it('should remove a crewmany by id', async () => {
      const id = 'id';
      const existsSpy = jest
        .spyOn(mongooseModel, 'exists')
        .mockResolvedValue({ _id: id });
      const model = new CrewmanModel();
      model._id = id;

      const removeSpy = jest
        .spyOn(mongooseModel, 'findByIdAndDelete')
        .mockResolvedValue(model);

      const result = await repository.remove(id);
      expect(existsSpy).toHaveBeenCalledWith({ _id: id });
      expect(removeSpy).toHaveBeenCalled();
      expect(result?.id).toBe(id);
    });

    it('should throw an exception if crewman not found', async () => {
      jest.spyOn(mongooseModel, 'exists').mockResolvedValue(null);

      await expect(repository.remove('1')).rejects.toThrow(ApiException);
    });
  });

  describe('get', () => {
    it('should return a crewman entity by id', async () => {
      const expectedModel: CrewmanModel = new CrewmanModel();
      expectedModel._id = '1';
      jest
        .spyOn(mongooseModel, 'findById')
        .mockResolvedValueOnce(expectedModel);

      const result = await repository.get('1');
      expect(result?.id).toEqual(expectedModel._id);
    });

    it('should return null if crewman with given id does not exist', async () => {
      jest.spyOn(mongooseModel, 'findById').mockResolvedValueOnce(null);

      const result = await repository.get('1');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a crewman entity by id', async () => {
      const id = 'id';
      jest.spyOn(mongooseModel, 'exists').mockResolvedValueOnce({ _id: id });
      const partialModel = { name: 'Updated Test' };

      await repository.update(id, partialModel);

      expect(mongooseModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        partialModel,
      );
    });

    it('should throw an exception if spaceship with given id does not exist', async () => {
      jest.spyOn(mongooseModel, 'exists').mockResolvedValueOnce(null);

      await expect(repository.update('1', {})).rejects.toThrow(ApiException);
    });
  });
});
