import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';


@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@LoggedUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(user.id, createTodoDto);
  }

  @Get()
  findAll(@LoggedUser() user: User) {
    return this.todoService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @LoggedUser() user: User, @Body() updateTodoDto: UpdateTodoDto) { 
    return this.todoService.update(id, user.id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
