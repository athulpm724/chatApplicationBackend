import { ConflictException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { loginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  // USER MODULE
  // ========================================================================================================
  // USER CREATION
  async create(createUserDTO: createUserDTO) { 
    // password verification function
    // if (!this.passwordVerifier(createUserDTO.password)) {
    //   throw new ConflictException('weak password');
    // }

    let user = await this.userRepo.findOneBy({ email: createUserDTO.email });

    if (user) throw new ConflictException('email already exist');

    // else create user

    // password encryption
    const encryptedPassword =
      (await this.passwordEncryption(createUserDTO.password)) ?? createUserDTO.password;
    createUserDTO.password = encryptedPassword;
    const newUser = await this.userRepo.create(createUserDTO);
    return await this.userRepo.save(newUser);
  }

  // USER LOGIN
  async login(userLoginDTO: loginUserDTO) { 

    const user = await this.userRepo.findOneBy({
      email: userLoginDTO.email
    });

    if(!user){
      throw new HttpException('user does not exist',404 )
    }

    const passwordVerification=await this.passwordVerification(userLoginDTO.password,user.password)
    if(passwordVerification){
      return "login successFul"
    }
    else{
      throw new UnauthorizedException("invalid password")
    }
  }

  passwordVerifier(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  async passwordEncryption(password: string): Promise<string> {
    const saltRound = parseInt(this.configService.get<string>('SALT_ROUND'));
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    return encryptedPassword;
  }

  async passwordVerification(password:string,encryptedPassword:string):Promise<Boolean>{
    return await bcrypt.compare(password,encryptedPassword)
  }

  // ========================================================================================================
}
