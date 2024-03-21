import { DeepPartial } from 'src/domain/base/deep-partial';

export abstract class GenericRepository<E> {
  abstract getAll(): Promise<E[]>;

  abstract get(id: string): Promise<E | null>;

  abstract create(item: E): Promise<string>;

  abstract update(id: string, item: DeepPartial<E>): Promise<void>;

  abstract remove(id: string): Promise<E>;
}
