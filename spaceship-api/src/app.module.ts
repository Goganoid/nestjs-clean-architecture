import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './infrastructure/db/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdapterModule } from './adapter/adapter.module';
import { ApplicationModule } from './application/application.module';
import { MongooseModule } from '@nestjs/mongoose';

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
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_URI'),
        dbName: configService.getOrThrow('MONGO_DB_NAME'),
        auth: {
          username: configService.getOrThrow('MONGO_USER'),
          password: configService.getOrThrow('MONGO_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    AdapterModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
