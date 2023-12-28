import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './models/company.model';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => Company, { nullable: true })
  async getCompanyById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company> {
    return await this.companiesService.getCompanyById(id);
  }
}
