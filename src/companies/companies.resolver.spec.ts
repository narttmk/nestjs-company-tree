import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { CompanyResolver } from './companies.resolver';
import { createMock } from '@golevelup/ts-jest';
describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let companiesService: CompaniesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        {
          provide: CompaniesService,
          useValue: createMock<CompaniesService>(),
        },
      ],
    }).compile();
    resolver = module.get<CompanyResolver>(CompanyResolver);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  describe('getCompanyById', () => {
    it('should get company from CompaniesService', async () => {
      const mockId = 'mock_company_id_1';
      await resolver.getCompanyById(mockId);
      expect(companiesService.getCompanyById).toHaveBeenCalledWith(mockId);
    });
  });
});
