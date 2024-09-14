/* eslint-disable @typescript-eslint/ban-types */

/**
 * This type does not allow selecting any property which is not an object, excluding functions, dates, buffers
 */
export type RelationsProperty<Property> =
  Property extends Promise<infer I>
    ? RelationsProperty<NonNullable<I>> | boolean
    : Property extends Array<infer I>
      ? RelationsProperty<NonNullable<I>> | boolean
      : Property extends string
        ? never
        : Property extends number
          ? never
          : Property extends boolean
            ? never
            : Property extends Function
              ? never
              : Property extends Buffer
                ? never
                : Property extends Date
                  ? never
                  : Property extends object
                    ? Relations<Property> | boolean
                    : boolean;

/**
 * This type does not allow selecting any property which is function, or array
 */
export type WhereProperty<Property> =
  Property extends Promise<any>
    ? never
    : Property extends Function
      ? never
      : Property extends Array<any>
        ? never
        : Property;

export type Relations<Entity> = {
  [P in keyof Omit<Entity, 'id'>]?: P extends 'toString'
    ? unknown
    : RelationsProperty<NonNullable<Entity[P]>>;
};

export type Where<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : WhereProperty<NonNullable<Entity[P]>>;
};

export interface Query<Entity> {
  where: Where<Entity>;
  relations?: Relations<Entity>;
}
