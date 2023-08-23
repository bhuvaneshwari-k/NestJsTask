import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from 'src/post/post.repository';
import { CreateUserInputs } from './dto/create-user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository ,private readonly postRepo:PostRepository) {}

  public async createUser(createUserInputs: CreateUserInputs) {
    return this.userRepo.createUser(createUserInputs);
  }
 
  public async getUser(){
    return this.userRepo.getUser();
  }

  public async getUserById(id) {
    // select * from users left join post on user.user_id = post.user_id where users.user_id = ''
    const user=await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.post', 'p')
      .where('user.id =:id', { id })
      .getOne();
      
      if (!user) {
        throw new NotFoundException('No user found.');
      }
      return user;
  }

  public async updateUser(id,updateuserinputs){
    return this.userRepo.updateUser(id,updateuserinputs);
  }

  public async deleteUserWithPosts(id){
    const userToDelete = await this.userRepo.findOne({ relations: ['post'] ,where:{id}});
     
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if(!userToDelete.post||userToDelete.post.length===0){
      throw new NotFoundException(`Post for USERID ${id} not found`);
    }
    
    for (const post of userToDelete.post) {
      await this.postRepo.remove(post);
    }

    await this.userRepo.softRemove(userToDelete);
   return userToDelete;
  }

}
