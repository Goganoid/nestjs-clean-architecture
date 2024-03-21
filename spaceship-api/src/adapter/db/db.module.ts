import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceshipRepositoryAbstract } from 'src/application/repositories/spaceship.abstract-repository';
import { SpaceshipModel } from './entities/spaceship.model';
import { SpaceshipRepository } from './repositories/spaceship/spaceship.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CrewmanModel, CrewmanSchema } from './entities/crewman.model';
import { CrewmanRepositoryAbstract } from 'src/application/repositories/crewman.abstract-repository';
import { CrewmanRepository } from './repositories/crewman/crewman.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceshipModel]),
    MongooseModule.forFeature([
      { name: CrewmanModel.name, schema: CrewmanSchema },
    ]),
  ],
  providers: [
    {
      provide: SpaceshipRepositoryAbstract,
      useClass: SpaceshipRepository,
    },
    {
      provide: CrewmanRepositoryAbstract,
      useClass: CrewmanRepository,
    },
  ],
  exports: [SpaceshipRepositoryAbstract, CrewmanRepositoryAbstract],
})
export class DbModule {}
