import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class createGroupDTO{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    groupName: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    createdBy:number

}