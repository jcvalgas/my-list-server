import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @ApiProperty({
        description: 'Text of a todo',
        example: 'shop at the market'
    })
    value: string;
}
