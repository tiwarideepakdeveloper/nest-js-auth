import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUser } from './interfaces/create.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TblUser } from './enities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(TblUser) private userRepo: Repository<TblUser>
    ){}
    
    async createUser(createUser: CreateUser) {
        const existing = await this.userRepo.findOne({ where: { user_email: createUser.user_email } }) 
        if(existing) throw new ConflictException('Email Already Exisits');
        
        this.userRepo.create(createUser);
        return await this.userRepo.save(createUser);
    }
}
