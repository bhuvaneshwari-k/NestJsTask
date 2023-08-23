/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}
  public async create(createPostInput: CreatePostInput) {
    return this.postRepo.createPost(createPostInput);
  }

  public async getPost() {
    return this.postRepo.getPost();
  }

  public async getPostById(id){
    return this.postRepo.getPostById(id);
  }

  public async updatePost(id,UpdatePostInput){
    return this.postRepo.updatePost(id,UpdatePostInput);
  }

  public async deletePost(id){
    return this.postRepo.deletePost(id);
  }
}
