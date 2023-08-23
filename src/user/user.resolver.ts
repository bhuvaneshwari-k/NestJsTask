import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInputs } from './dto/create-user.input';
import { UpdateUserInputs } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User , {name:"createUser"})
  public async createUser(
    @Args('createUserInputs') createUserInputs: CreateUserInputs,
  ) {
    return this.userService.createUser(createUserInputs);
  }

  @Query(()=>[User],{name:"getAllusers"})
  public async getUser(){
    return this.userService.getUser();
  }
  
  @Query(() => User)
  public async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }
  
  @Mutation(()=> User)
  public async updateUser(@Args('id') id:string,@Args('updateuserinputs') UpdateUserInputs:UpdateUserInputs){
    return this.userService.updateUser(id,UpdateUserInputs)
  }

  @Mutation(()=>User)
  public async deleteUserWithPosts(@Args('id') id:string){
    return this.userService.deleteUserWithPosts(id);
  }
}
