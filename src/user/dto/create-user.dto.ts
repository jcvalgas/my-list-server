import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: 'Username',
        example: 'Valgas'
    })
    name: string;

    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'valgas@mail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'User password',
        example: 'teste123'
    })
    password: string;
}
