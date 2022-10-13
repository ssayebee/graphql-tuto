import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoRequest {
  @Field(() => String, { description: 'description' })
  description: string;
}
