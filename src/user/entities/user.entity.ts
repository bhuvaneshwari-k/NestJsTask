import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @Column({type:"numeric"})
  phoneNumber:number;

 @Field({nullable:true})
 @CreateDateColumn({
  type: 'timestamp'})
  createdAt:Date;

 @Field({nullable:true})
 @Column({
  type: 'timestamp',
  nullable:true})
 updatedAt:Date

 @Field({nullable:true})
 @DeleteDateColumn({
  type: 'timestamp',
   nullable:true})
 deletedAt:Date
 
  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
}
