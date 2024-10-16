import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class createUserDTO{

    @IsString()
    @MinLength(30,{message:"exceeded limit"})
    @IsNotEmpty({message:"first name should not be empty"})
    @ApiProperty()
    firstName : string;

    @IsString()
    @MinLength(30,{message:"exceeded limit"})
    @ApiProperty()
    lastName : string;

    @IsAlphanumeric()
    @MinLength(10,{message:"exceeded limit"})
    @ApiProperty()
    username:string;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNumber()
    @Min(15,{message:"age should be greater than or equal to 16"})
    @ApiProperty({default:16})
    age:number;

    @IsString()
    @ApiProperty()
    password:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    version:string;
}