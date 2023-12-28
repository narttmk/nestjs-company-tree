import { Travel } from '../models/travel.model';

export const mockTravels: Travel[] = [
  {
    id: 'mock_id_1',
    createdAt: '2023-01-01',
    employeeName: 'John Doe',
    departure: 'City A',
    destination: 'City B',
    price: '100',
    companyId: 'mock_company_id_1',
  },
  {
    id: 'mock_id_2',
    createdAt: '2023-01-02',
    employeeName: 'Jane Smith',
    departure: 'City C',
    destination: 'City D',
    price: '150',
    companyId: 'mock_company_id_2',
  },
];
