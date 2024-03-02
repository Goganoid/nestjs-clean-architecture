import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceshipRepositoryAbstract } from 'src/application/repositories/spaceship.abstract-repository';
import { SpaceshipModel } from './entities/spaceship.model';
import { SpaceshipRepository } from './repositories/spaceship/spaceship.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceshipModel])],
  providers: [
    {
      provide: SpaceshipRepositoryAbstract,
      useClass: SpaceshipRepository,
    },
  ],
  exports: [SpaceshipRepositoryAbstract],
})
export class DbModule {}
