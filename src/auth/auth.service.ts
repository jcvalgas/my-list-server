import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

  async login(LoginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = LoginDto;
    const user = await this.prismaService.user.findUnique({where: {email}});

    if(!user) {
      throw new UnauthorizedException('Credenciais inválidads');
    }

    const isHashValid = await bcrypt.compare(password, user.password);

    if(!isHashValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({email}),
      user,
    };
  }

}
