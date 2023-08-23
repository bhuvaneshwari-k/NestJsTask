import { Field,InputType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';


@InputType()
export class CreateUserInputs {
  @Field()
  fullname: string;

  @Field()
 phoneNumber:number;

 @Field({nullable:true})
 createdAt:Date;

}
