import { Module } from '@nestjs/common';
import { SpaceshipController } from './api/spaceship/spaceship.controller';
import { DbModule } from './db/db.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [DbModule, ApplicationModule],
  controllers: [SpaceshipController],
  exports: [],
})
export class AdapterModule {}
