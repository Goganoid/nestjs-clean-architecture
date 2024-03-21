import { Module } from '@nestjs/common';
import { SpaceshipController } from './api/spaceship/spaceship.controller';
import { DbModule } from './db/db.module';
import { ApplicationModule } from 'src/application/application.module';
import { CrewmanController } from './api/crewman/crewman.controller';

@Module({
  imports: [DbModule, ApplicationModule],
  controllers: [SpaceshipController, CrewmanController],
  exports: [],
})
export class AdapterModule {}
