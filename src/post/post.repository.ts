
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(createPostInput: CreatePostInput) {
    let count=await this.count({where:{userId:createPostInput.userId}})
    createPostInput.postOrderNumber=count+1;
    console.log(createPostInput.postOrderNumber)
    return this.save(createPostInput);
  }

  async getPost(){
    const posts=await this.find({relations:['user']});
    console.log(posts)
    if(!posts||posts.length===0){
      throw new NotFoundException(`Posts not found`);
    }
    return posts;
  }

  async getPostById(id){
    const post=await this.findOne({relations:['user'],where:{id}})
    if(!post){
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  public async updatePost(id,updatePostInput){
    await this.update(id,updatePostInput);
    const post=await this.findOne({where:{id}});
    if(!post){
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  public async deletePost(id){
    const postToDelete = await this.findOne({where:{id}});
    if(!postToDelete){
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const orderNumberToDelete = postToDelete.postOrderNumber;
    await this.createQueryBuilder()
    .update(Post)
    .set({ postOrderNumber: () => `"postOrderNumber" - 1` })
    .where('"postOrderNumber" > :orderNumberToDelete', { orderNumberToDelete })
    .execute();

    await this.softRemove(postToDelete);

    return postToDelete;
  }
}
