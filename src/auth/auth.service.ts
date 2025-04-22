import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUser } from './interfaces/create.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TblUser } from './enities/user.entity';
import { Repository } from 'typeorm';
import { SignInUser } from './interfaces/signin.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(TblUser) private userRepo: Repository<TblUser>,
        private jwtService: JwtService
    ){}
    
    async createUser(createUser: CreateUser) {
        const existing = await this.userRepo.findOne({ where: { user_email: createUser.user_email } }) 
        if(existing) throw new ConflictException('Email Already Exisits');
        createUser.user_password = await bcrypt.hash(createUser.user_password, 10);
        this.userRepo.create(createUser);
        return await this.userRepo.save(createUser);
    }

    async signInUser(signInUser: SignInUser) {
        const existing = await this.userRepo.findOne({ where: { user_email: signInUser.user_email }})
        if(!existing) throw new ConflictException('Wrong Credentials Used');

        if(!await bcrypt.compare(signInUser.user_password, existing.user_password)){
            throw new ConflictException('Wrong Credentials Used');
        }
        // return existing;
        const token = await this.jwtService.signAsync({ id: existing.user_id, email: existing.user_email});
        return { token  };
    }
}
