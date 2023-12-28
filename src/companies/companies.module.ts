import { Module } from '@nestjs/common';
import { CompanyResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [CompaniesService, CompanyResolver],
})
export class CompaniesModule {}
