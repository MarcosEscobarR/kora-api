import { MeasurementUnits } from 'src/commonds/Constants';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  name: string;
  @Column('simple-enum')
  MeasurementUnits: MeasurementUnits;
  @Column('integer')
  Quantity: number;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
}
