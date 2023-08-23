import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(()=>[Post],{name:"getAllposts"})
   async getPost(){
    return this.postService.getPost();
  }

  @Query(() => Post,{name:"getPostbyId"})
  async getPostById(@Args('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Mutation(()=> Post)
  public async updatePost(@Args('id') id:string,@Args('updatepostinputs') UpdatePostInput:UpdatePostInput){
    return this.postService.updatePost(id,UpdatePostInput)
  }

  @Mutation(() => Post)
  public async deletePost(@Args('id') id:string){
     return this.postService.deletePost(id);
  }
}
