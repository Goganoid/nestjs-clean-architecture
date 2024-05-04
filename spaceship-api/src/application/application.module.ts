import { Module } from '@nestjs/common';
import { DbModule } from 'src/adapter/db/db.module';
import { ShipUseCases } from './usecases/ship.usecase';
import { CrewmanUseCases } from './usecases/crewman.usecase';
import { CrewInSpaceshipUseCases } from './usecases/crew-in-spaceship.usecase';

@Module({
  imports: [DbModule],
  providers: [ShipUseCases, CrewmanUseCases, CrewInSpaceshipUseCases],
  exports: [ShipUseCases, CrewmanUseCases, CrewInSpaceshipUseCases],
})
export class ApplicationModule {}
