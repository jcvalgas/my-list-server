import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
    @IsString()
    @ApiProperty({
        description: 'Token JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvQG1haWwuY29tIiwiaWF0IjoxNjY0Mzc5MTI5LCJleHAiOjE2NjQ0NjU1Mjl9.Wr-Ox7dkl1Q1RNpzn9_ysaiyuVgcnJsW3EBOj0QVops'
    })
    token: string;
    @ApiProperty({
        description: 'Returned user'
    })
    user: User;
}
