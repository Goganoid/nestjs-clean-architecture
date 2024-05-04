import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceshipRepository } from 'src/application/repositories/spaceship.abstract-repository';
import { SpaceshipModel } from './entities/spaceship.model';
import { SpaceshipRepositoryImplementation } from './repositories/spaceship/spaceship.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CrewmanModel, CrewmanSchema } from './entities/crewman.model';
import { CrewmanRepository } from 'src/application/repositories/crewman.abstract-repository';
import { CrewmanRepositoryImplementation } from './repositories/crewman/crewman.repository';
import { BlobClient } from 'src/application/interfaces/blob-client';
import { BlobClientImplementation } from './blob/blob-client';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceshipModel]),
    MongooseModule.forFeature([
      { name: CrewmanModel.name, schema: CrewmanSchema },
    ]),
  ],
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
