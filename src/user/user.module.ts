import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PostRepository } from 'src/post/post.repository';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Post])],
  providers: [UserResolver, UserService, UserRepository,PostRepository],
})
export class UserModule {}
