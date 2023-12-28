import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { sendRequest } from '../utils/request';
import { Company } from './models/company.model';
import { Travel } from './models/travel.model';
import { Cache } from 'cache-manager';
import { COMPANY_API, TRAVEL_API } from 'src/utils/constains';

@Injectable()
export class CompaniesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   *
   * @returns list of companies as tree
   */
  async getCompaniesTree(): Promise<Company[]> {
    const cachedCompanies = await this.cacheManager.get<Company[]>('companies');
    if (cachedCompanies) {
      return cachedCompanies;
    }

    const [companies, travels] = await Promise.all([
      sendRequest<Company[]>(COMPANY_API),
      sendRequest<Travel[]>(TRAVEL_API),
    ]);
    const prices = new Map();
    for (const travel of travels) {
      const { companyId } = travel;
      const price = (prices.get(companyId) || 0) + parseFloat(travel.price);
      prices.set(companyId, price);
    }
    const buildCompanyTree = (flatArray, parentId = '0') => {
      const tree = [];
      flatArray.forEach((company) => {
        if (company.parentId === parentId) {
          const children = buildCompanyTree(flatArray, company.id);
          let totalCost = 0;
          if (children.length > 0) {
            company.children = children;
            for (const item of children) {
              totalCost += item.cost;
            }
          }
          company.cost = prices.get(company.id) + totalCost;
          tree.push(company);
        }
      });

      return tree;
    };

    const companiesTree = buildCompanyTree(companies);
    await this.cacheManager.set('companies', companiesTree, 0);
    return companiesTree;
  }

  async getCompanyById(companyId: string): Promise<Company> {
    const companiesTree = await this.getCompaniesTree();
    const findById = (tree: Company[]): Company => {
      for (const company of tree) {
        if (company.id === companyId) {
          return company;
        }

        if (company.children) {
          const childResult = findById(company.children);
          if (childResult) {
            return childResult;
          }
        }
      }

      return null;
    };
    return findById(companiesTree);
  }
}
