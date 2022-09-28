import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email',
        example: 'valgas@mail.com'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User password',
        example: 'teste123'
    })
    password: string;
    
}
