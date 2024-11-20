import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { CrewInSpaceshipController } from './api/crewman/crew-in-spaceship.controller';
import { CrewmanController } from './api/crewman/crewman.controller';
import { SpaceshipController } from './api/spaceship/spaceship.controller';
import { DbModule } from './db/db.module';
import { HealthController } from './api/health/health.controller';

@Module({
  imports: [DbModule, ApplicationModule],
  controllers: [
    SpaceshipController,
    CrewmanController,
    CrewInSpaceshipController,
    HealthController,
  ],
  exports: [],
})
export class AdapterModule {}
