import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @ApiBody({type:createUserDTO})
    @Post('signup')
    async signup(@Body()createUserDTO:createUserDTO){
        return await this.authService.create(createUserDTO)
    }

}
