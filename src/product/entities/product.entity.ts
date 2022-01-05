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
  constructor(name: string, measureUnit: MeasurementUnits, quantity: number, provider: Provider) {
    this.Name = name;
    this.MeasurementUnits  = measureUnit;
    this.Quantity = quantity;
    this.Provider = provider;
        
  }
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @Column('simple-enum')
  MeasurementUnits: MeasurementUnits;
  @Column('integer')
  Quantity: number;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
}
