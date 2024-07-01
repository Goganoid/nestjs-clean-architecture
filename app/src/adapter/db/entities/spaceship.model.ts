import {
  IsPositive,
  Length,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { BaseModelEntity } from 'src/domain/base/base.interface';
import {
  BeforeInsert,
  BeforeUpdate,
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
  @Length(3, 255)
  name: string;

  @Column('float')
  @Min(1)
  @Max(10e4)
  size: number;

  @Column('float')
  @IsPositive()
  armour: number;

  @Column('float')
  @IsPositive()
  thrust: number;

  @Column('float')
  @IsPositive()
  jump: number;

  @Column('float')
  @IsPositive()
  maxPower: number;

  @Column('float')
  @IsPositive()
  maxFuel: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
