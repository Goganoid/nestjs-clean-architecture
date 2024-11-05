import { Repository } from 'typeorm';
import { MockType } from './types';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    findOneById: jest.fn(),
    exists: jest.fn(),
    existsBy: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  }),
);
