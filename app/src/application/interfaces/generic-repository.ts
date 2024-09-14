import { DeepPartial } from 'src/domain/base/deep-partial';
import { Query } from './query';

export abstract class GenericRepository<E> {
  abstract getAll(): Promise<E[]>;

  abstract get(id: string): Promise<E | null>;

  abstract create(item: E): Promise<E>;

  abstract update(id: string, item: DeepPartial<E>): Promise<void>;

  abstract remove(id: string): Promise<E>;

  abstract getWhere(query: Query<E>): Promise<E[]>;

  abstract getOneWhere(query: Query<E>): Promise<E | null>;
}
