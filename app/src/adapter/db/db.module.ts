import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlobClient } from 'src/application/interfaces/blob-client';
import { CrewmanRepository } from 'src/application/repositories/crewman.abstract-repository';
import { SpaceshipRepository } from 'src/application/repositories/spaceship.abstract-repository';
import { BlobClientImplementation } from './blob/blob-client';
import { CrewmanModel } from './entities/crewman.model';
import { SpaceshipModel } from './entities/spaceship.model';
import { CrewmanRepositoryImplementation } from './repositories/crewman/crewman.repository';
import { SpaceshipRepositoryImplementation } from './repositories/spaceship/spaceship.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceshipModel, CrewmanModel])],
  providers: [
    {
      provide: SpaceshipRepository,
      useClass: SpaceshipRepositoryImplementation,
    },
    {
      provide: CrewmanRepository,
      useClass: CrewmanRepositoryImplementation,
    },
    {
      provide: BlobClient,
      useClass: BlobClientImplementation,
    },
  ],
  exports: [SpaceshipRepository, CrewmanRepository, BlobClient],
})
export class DbModule {}
