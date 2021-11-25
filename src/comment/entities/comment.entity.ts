import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Provider } from '../../provider/entities/provider.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Company)
  Company: Company;
  @ManyToOne(() => Provider)
  Provider: Provider;
  @Column('varchar')
  Comment: string;
}
