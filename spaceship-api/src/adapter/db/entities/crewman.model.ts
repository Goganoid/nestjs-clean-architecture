import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModelEntity } from 'src/domain/base/base.interface';
import { CrewmanRole } from 'src/domain/enums/crewman-role.enum';

export type CrewmanDocument = HydratedDocument<CrewmanModel>;

@Schema()
export class CrewmanModel implements BaseModelEntity {
  _id: string;
  @Prop()
  name: string;
  @Prop({ type: String, enum: CrewmanRole })
  role: CrewmanRole;
  @Prop()
  birthDate: Date;
  @Prop()
  salary: number;
  @Prop()
  shipId: string;
}

export const CrewmanSchema = SchemaFactory.createForClass(CrewmanModel);
