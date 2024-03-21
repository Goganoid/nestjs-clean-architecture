import { Module } from '@nestjs/common';
import { DbModule } from 'src/adapter/db/db.module';
import { ShipUseCases } from './usecases/ship.usecase';
import { CrewmanUseCases } from './usecases/crewman.usecase';

@Module({
  imports: [DbModule],
  providers: [ShipUseCases, CrewmanUseCases],
  exports: [ShipUseCases, CrewmanUseCases],
})
export class ApplicationModule {}
