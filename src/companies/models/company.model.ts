import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  name: string;

  @Field(() => ID)
  parentId: string;

  @Field()
  cost?: number;

  @Field(() => [Company], { defaultValue: [] })
  children?: Company[];
}
