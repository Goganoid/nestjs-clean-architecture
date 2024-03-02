import { DeepPartial } from 'src/domain/base/deep-partial';

export abstract class GenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(id: string): Promise<T | null>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: DeepPartial<T>): Promise<void>;

  abstract remove(id: string): Promise<T>;
}
