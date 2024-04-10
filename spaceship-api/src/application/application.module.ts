import { Module } from '@nestjs/common';
import { DbModule } from 'src/adapter/db/db.module';
import { ShipUseCases } from './usecases/ship.usecase';

@Module({
  imports: [DbModule],
  providers: [ShipUseCases],
  exports: [ShipUseCases],
})
export class ApplicationModule {}
