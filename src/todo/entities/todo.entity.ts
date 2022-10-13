import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id' })
  id: string;

  @Column()
  @Field(() => String, { description: 'description' })
  description: string;

  @Column()
  @Field(() => Boolean, { description: 'status' })
  status: boolean;
}
