import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, createTodoDto: CreateTodoDto) {
    const data: Prisma.TodoCreateInput = {
      value: createTodoDto.value,
      user: {
        connect: {
          id: userId
        }
      }
    }

    return this.prisma.todo.create({data});
  }

  findAll(userId: string) {
    return this.prisma.todo.findMany({where: {userId}});
  }

  findOne(id: string) {
    return this.prisma.todo.findUnique({where: {id}});
  }

  update(id: string, userId: string, updateTodoDto: UpdateTodoDto) {
    const data: Prisma.TodoCreateInput = {
      value: updateTodoDto.value,
      user: {
        connect: {
          id: userId
        }
      }
    }

    return this.prisma.todo.update({data, where: {id}});
  }

  remove(id: string) {
    return `This action removes a #${id} todo`;
  }
}
