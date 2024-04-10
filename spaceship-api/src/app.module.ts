import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './infrastructure/db/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdapterModule } from './adapter/adapter.module';
import { ApplicationModule } from './application/application.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
