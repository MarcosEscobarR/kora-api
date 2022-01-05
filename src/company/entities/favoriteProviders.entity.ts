import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { Provider } from '../../provider/entities/provider.entity';

@Entity()
export class FavoriteProviders {
  constructor(company: Company, provider: Provider) {
    this.Company = company;
    this.Provider = provider;
  }
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Company)
  Company: Company;
  @ManyToOne(() => Provider)
  Provider: Provider;
}
