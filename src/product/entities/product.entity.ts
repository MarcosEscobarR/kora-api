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
  @Column('enum')
  MeasurementUnits: MeasurementUnits;
  @Column('int64')
  Quantity: number;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
}
