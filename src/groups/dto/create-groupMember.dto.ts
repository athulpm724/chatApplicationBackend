import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class createGroupMemberDTO{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    groupId: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId:number

}