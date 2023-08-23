import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity({ name: 'post' })
export class Post {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  id: string;

  @Field()
  @Column({ name: 'post_name' })
  postName: string;

  @Field(()=>Int)
  @Column({name:"postOrderNumber"})
  postOrderNumber:number

  @Field({name:"CreatedAt_post"})
  @CreateDateColumn({
    type: 'timestamp'
    })
  createdAt:Date;
  @Field({  name:"UpdatedAt_post"})
  @Column({
    type: 'timestamp',
    nullable:true})
  updatedAt:Date
 
  @Field({ name:"DeletedAt_post"})
  @DeleteDateColumn({
    type: 'timestamp',
    nullable:true})
  deletedAt:Date

  @Field()
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: User;

 @Field()
 @Column({name:'user_id'})
 userId:string;
}
