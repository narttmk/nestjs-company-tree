import { Company } from '../models/company.model';

export const mockCompanies: Company[] = [
  {
    id: 'mock_company_id_1',
    name: 'mock company name 1',
    createdAt: new Date().toString(),
    parentId: '0',
  },
  {
    id: 'mock_company_id_2',
    name: 'mock company name 1',
    createdAt: new Date().toString(),
    parentId: 'mock_company_id_1',
  },
];
