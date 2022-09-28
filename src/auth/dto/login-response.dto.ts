import { IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
    @IsString()
    token: string;
    user: User;
    
}
