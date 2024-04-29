import { IsEmail, IsString, Length } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    @Length(6, 10)
    password: string;
}