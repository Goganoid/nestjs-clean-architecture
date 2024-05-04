import {
  BullModule,
  RegisterQueueOptions,
  SharedBullAsyncConfiguration,
} from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SPACESHIP_CREW_QUEUE } from './queues';

export const bullConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    connection: {
      host: configService.getOrThrow('REDIS_HOST'),
      port: Number(configService.getOrThrow('REDIS_PORT')),
      password: configService.get('REDIS_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};

export const bullQueueOptions: RegisterQueueOptions[] = [
  {
    name: SPACESHIP_CREW_QUEUE,
  },
];

export const bullModuleImports = [
  BullModule.forRootAsync(bullConfig),
  BullModule.registerQueue(...bullQueueOptions),
];
