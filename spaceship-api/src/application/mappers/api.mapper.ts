import {
  BaseEntity,
  BasePayloadEntity,
  BasePresenterEntity,
} from 'src/domain/base/base.interface';

export interface ApiMapper<
  T extends BaseEntity | Error,
  P extends BasePresenterEntity,
  R extends BasePayloadEntity,
> {
  //Map an Entity to a Presenter
  toApi(entity: T): P;

  // Map a Payload to an Entity
  toEntity(payload: R): T;
}

export type Mapper<T extends BaseEntity, R extends BasePayloadEntity> = (
  entity: T,
) => R;
