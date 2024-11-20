import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AdapterModule } from './adapter/adapter.module';
import { ApplicationModule } from './application/application.module';
import typeorm from './infrastructure/db/config';
import { getLoggerModuleOptions } from './infrastructure/monitoring/logger/logger';
import { OpenTelemetryModuleConfig } from './infrastructure/monitoring/otel/otel.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:
        process.env.NODE_ENV === 'test'
          ? () => ({
              type: 'sqlite',
              database: ':memory:',
              entities: [`${__dirname}/**/*.model{.ts,.js}`],
              synchronize: true,
            })
          : async (configService: ConfigService) =>
              configService.getOrThrow('typeorm'),
    }),
    AdapterModule,
    ApplicationModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) =>
        getLoggerModuleOptions(configService),
    }),
    OpenTelemetryModuleConfig,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
