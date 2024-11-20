import { Module } from '@nestjs/common';
import { DbModule } from 'src/adapter/db/db.module';
import { ShipUseCases } from './usecases/ship.usecase';
import { CrewmanUseCases } from './usecases/crewman.usecase';
import { CrewInSpaceshipUseCases } from './usecases/crew-in-spaceship.usecase';
import { EventsModule } from 'src/adapter/message-brokers/message-brokers.module';
import { CrewAddedUseCase } from './usecases/crew-added.usecase';

@Module({
  imports: [DbModule, EventsModule],
  providers: [
    ShipUseCases,
    CrewmanUseCases,
    CrewInSpaceshipUseCases,
    CrewAddedUseCase,
  ],
  exports: [ShipUseCases, CrewmanUseCases, CrewInSpaceshipUseCases],
})
export class ApplicationModule {}
