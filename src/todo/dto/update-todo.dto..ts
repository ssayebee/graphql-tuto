import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoRequest } from './create-todo.dto';

@InputType()
export class UpdateTodoRequest extends PartialType(CreateTodoRequest) {
  @Field(() => String)
  id: string;
  @Field(() => Boolean)
  status: boolean;
}
