import { BaseModelEntity } from 'src/domain/base/base.interface';
import { CreateSpaceShipDTO } from 'src/domain/dto/create-spaceship.dto';
import { SpaceshipEntity } from 'src/domain/entities/spaceship.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SpaceshipModel implements BaseModelEntity<SpaceshipEntity> {
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

  toEntity(): SpaceshipEntity {
    return {
      armour: this.armour,
      id: this.id,
      jump: this.jump,
      maxFuel: this.maxFuel,
      maxPower: this.maxPower,
      name: this.name,
      size: this.size,
      thrust: this.thrust,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }

  fromEntity({
    armour,
    id,
    jump,
    maxFuel,
    maxPower,
    name,
    size,
    thrust,
  }: SpaceshipEntity) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.thrust = thrust;
    this.armour = armour;
    this.jump = jump;
    this.maxFuel = maxFuel;
    this.maxPower = maxPower;
    return this;
  }

  fromDTO({
    armour,
    jump,
    maxFuel,
    maxPower,
    name,
    size,
    thrust,
  }: CreateSpaceShipDTO) {
    this.name = name;
    this.size = size;
    this.thrust = thrust;
    this.armour = armour;
    this.jump = jump;
    this.maxFuel = maxFuel;
    this.maxPower = maxPower;
    return this;
  }
}
