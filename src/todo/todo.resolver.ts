import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTodoRequest } from './dto/create-todo.dto';
import { UpdateTodoRequest } from './dto/update-todo.dto.';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('req') createTodo: CreateTodoRequest) {
    return this.todoService.create(createTodo);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('req') updateTodo: UpdateTodoRequest) {
    return this.todoService.update(updateTodo);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }
}
