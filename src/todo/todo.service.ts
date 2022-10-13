import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoRequest } from './dto/create-todo.dto';
import { UpdateTodoRequest } from './dto/update-todo.dto.';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Array<Todo>> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo: ${id} not found`);
    }
    return todo;
  }

  async create({ description }: CreateTodoRequest) {
    const todo = this.todoRepository.create({
      status: false,
      description,
    });
    return await this.todoRepository.save(todo);
  }

  async update(req: UpdateTodoRequest) {
    const todo = await this.todoRepository.preload(req);
    if (!todo) {
      throw new NotFoundException(`Todo: ${req.id} not found`);
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    await this.todoRepository.remove(todo);
    return {
      id,
      description: '',
      status: false,
    };
  }
}
