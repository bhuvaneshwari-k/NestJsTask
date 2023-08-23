import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInputs {
    @Field({nullable:true})
    fullname:string;

    @Field({nullable:true})
    phoneNumber:number;

    @Field({nullable:true,defaultValue:new Date()})
    updatedAt:Date;
}


