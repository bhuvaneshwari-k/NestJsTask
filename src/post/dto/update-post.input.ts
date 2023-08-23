import { InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class UpdatePostInput{
  @Field()
  postName: string;
  
  @Field({nullable:true , defaultValue:new Date()})
  updatedAt:Date;

}
