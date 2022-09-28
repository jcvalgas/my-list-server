import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a todo'
  })
  create(@LoggedUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(user.id, createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all todos of currently authenticated user'
  })
  findAll(@LoggedUser() user: User) {
    return this.todoService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the todo by id'
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update todo by id'
  })
  update(@Param('id') id: string, @LoggedUser() user: User, @Body() updateTodoDto: UpdateTodoDto) { 
    return this.todoService.update(id, user.id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete todo by id'
  })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
