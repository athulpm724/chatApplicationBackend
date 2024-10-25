import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)private readonly userRepo:Repository<User>
    ){}

    // USER MODULE

    // USER CREATION
    async create(createUserDTO:createUserDTO){
        // password verification function
        if(!this.passwordVerifier(createUserDTO.password)){
            throw new ConflictException("weak password")
        }
        // password encryption

        let user = await this.userRepo.findOneBy(
            { email: createUserDTO.email }  
          )

          if(user)throw new ConflictException("email already exist")
  
        // create code to update version number to file from .env

        // else create user
        const newUser = await this.userRepo.create(createUserDTO)
        return await this.userRepo.save(newUser)
        
    }   


    // REGEX PASSWORD VERIFICATION
    passwordVerifier(password:string){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password)
    }

    // PASSWORD ENCRYPTION
    passwordEncryption(password:string){
        
    }
}
