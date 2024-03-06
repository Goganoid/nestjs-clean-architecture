import { BaseModelEntity } from 'src/domain/base/base.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SpaceshipModel implements BaseModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  size: number;

  @Column('float')
  armour: number;

  @Column('float')
  thrust: number;

  @Column('float')
  jump: number;

  @Column('float')
  maxPower: number;

  @Column('float')
  maxFuel: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
