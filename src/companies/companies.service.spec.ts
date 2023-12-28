import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { COMPANY_API } from '../utils/constains';
import { mockCompanies } from './mocks/companies.mock';
import { mockTravels } from './mocks/travels.mock';

jest.mock('../utils/request', () => ({
  sendRequest: async (url: string): Promise<any> => {
    const result = url === COMPANY_API ? mockCompanies : mockTravels;
    return result;
  },
}));
describe('CompaniesService', () => {
  let service: CompaniesService;
  let cacheManager: Cache;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CompaniesService],
    }).compile();
    service = module.get<CompaniesService>(CompaniesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  describe('getCompaniesTree', () => {
    it('should return all mock companies', async () => {
      jest.spyOn(cacheManager, 'set');
      const expectedResult = [
        {
          ...mockCompanies[0],
          cost: 250,
          children: [{ ...mockCompanies[1], cost: 150 }],
        },
      ];
      const companiesTree = await service.getCompaniesTree();
      expect(companiesTree).toStrictEqual(expectedResult);
      expect(cacheManager.set).toHaveBeenCalled();
    });
  });

  describe('getCompanyById', () => {
    it('should return a company', async () => {
      const expectedResult = {
        ...mockCompanies[1],
        cost: 150,
      };
      const company = await service.getCompanyById(mockCompanies[1].id);
      expect(company).toStrictEqual(expectedResult);
    });
  });
});
