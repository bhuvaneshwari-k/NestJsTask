import { InputType, Field, Int } from '@nestjs/graphql';



@InputType()
export class CreatePostInput {
  @Field()
  postName: string;
  
  @Field(()=>Int,{nullable:true})
  postOrderNumber:number

  @Field({nullable:true})
  createdAt:Date;

  @Field()
  userId: string;
}
