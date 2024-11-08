import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AdapterModule } from './adapter/adapter.module';
import { ApplicationModule } from './application/application.module';
import { bullModuleImports } from './infrastructure/bull/config';
import typeorm from './infrastructure/db/config';
import { getLoggerModuleOptions } from './infrastructure/monitoring/logger/logger';
import { OpenTelemetryModuleConfig } from './infrastructure/monitoring/otel/otel.config';
import { startMongoInMemory } from './infrastructure/tests/mongo-inmemory';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          const uri = await startMongoInMemory();
          return { uri };
        }
        return {
          uri: configService.getOrThrow('MONGO_URI'),
          dbName: configService.getOrThrow('MONGO_DB_NAME'),
          auth: {
            username: configService.getOrThrow('MONGO_USER'),
            password: configService.getOrThrow('MONGO_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ...bullModuleImports,
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
