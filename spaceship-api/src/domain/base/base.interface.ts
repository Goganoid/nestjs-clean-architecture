export class BaseEntity {}
export abstract class BaseModelEntity<TEntity = any, TDTO = any> {
  abstract toEntity(): TEntity;
  abstract fromEntity(entity: TEntity): BaseModelEntity<TEntity, TDTO>;
  abstract fromDTO(dto: TDTO): BaseModelEntity<TEntity, TDTO>;
}
export class BasePresenterEntity {}
export class BasePayloadEntity {
  id?: string;
}
