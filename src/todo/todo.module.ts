import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [PrismaModule, PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
