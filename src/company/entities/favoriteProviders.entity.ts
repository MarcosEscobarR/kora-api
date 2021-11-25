import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { Provider } from '../../provider/entities/provider.entity';

@Entity()
export class FavoriteProviders {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Company)
  Company: Company;
  @ManyToOne(() => Provider)
  Provider: Provider;
}
