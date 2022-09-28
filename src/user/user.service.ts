import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    return this.prisma.user.create({data});
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User>  {
    await this.findById(id);
    const data: Partial<User> = {
      ...updateUserDto
    }

    if(data.password){
      data.password = await bcrypt.hash(data.password, 10)
    }

    return this.prisma.user.update({
      data,
      where: {id}
    })
  }

  async remove(id: string) {
    await this.findById(id);
    try {
      await this.prisma.todo.deleteMany();
      await this.prisma.user.delete({where: {id}});
    } catch(err) {
      console.log(err);
    }
  }

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({where: {id}});

    if(!record) {
      throw new NotFoundException('Registro com o id não encontrado');
    }

    return record;
  }
}
