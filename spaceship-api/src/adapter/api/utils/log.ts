import { Logger, LoggerService } from '@nestjs/common';

export type Transform = (data: any) => any;

export interface Options {
  logger?: LoggerService;
  prefix?: string;
  transform?: Transform;
  timestamp?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  prefix: 'Function',
  timestamp: true,
};

export const Log = (options = DEFAULT_OPTIONS) => {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ): void => {
    const logger = options?.logger ?? new Logger(target?.constructor?.name);
    const original = descriptor?.value;

    descriptor.value = new Proxy(original, {
      apply: async function (target, thisArg, args: unknown[]) {
        const currentTime = Date.now();
        logger.debug?.(
          `${options?.prefix} "${propertyName}" invoke -> ${JSON.stringify(
            options?.transform ? options?.transform(args) : args,
          )}`,
        );
        try {
          const data = await target.apply(thisArg, args);

          const executeTime = options?.timestamp
            ? `${Date.now() - currentTime}ms.`
            : '';

          logger.debug?.(
            `${options?.prefix} "${propertyName}" result -> ${JSON.stringify(
              options?.transform ? options?.transform(data) : data,
            )} ${executeTime}`,
          );

          return data;
        } catch (e) {
          logger.error(`${options?.prefix} "${propertyName}" failed`, e);
          throw e;
        }
      },
    });
  };
};
