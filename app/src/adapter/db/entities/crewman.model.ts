import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModelEntity } from 'src/domain/base/base.interface';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';
import { ColumnNumericTransformer } from 'src/infrastructure/db/numeric-transformer';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SpaceshipModel } from './spaceship.model';

export type CrewmanDocument = HydratedDocument<CrewmanModel>;

@Schema()
export class CrewmanModel implements BaseModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'enum', enum: CrewmanRole })
  role: CrewmanRole;
  @Column({ type: 'timestamptz' })
  birthDate: Date;
  @Column({ type: 'decimal', transformer: new ColumnNumericTransformer() })
  salary: number;

  @ManyToOne(() => SpaceshipModel, (spaceship) => spaceship.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spaceship_id' })
  spaceship: SpaceshipModel;

  @Column({ name: 'spaceship_id' })
  spaceshipId: string;
}

export const CrewmanSchema = SchemaFactory.createForClass(CrewmanModel);
