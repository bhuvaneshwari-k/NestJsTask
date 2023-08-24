import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreateUserInputs } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
 
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(createUserInputs: CreateUserInputs) {
    return this.save(createUserInputs);
  }

  public async getUser(){
    const users=await this.createQueryBuilder('user')
    .leftJoinAndSelect('user.post', 'p')
    .getMany();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found.');
    }
    return users;
  }

  public async updateUser(id,updateuserinputs){
    const user=await this.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException('No user found.');
    }
     await this.update(id,updateuserinputs);
    
    return user;
  }
}
