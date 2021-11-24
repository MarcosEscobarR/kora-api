import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @Column('varchar')
  LastName: string;
  @Column('varchar')
  Password: string;
  @Column('varchar')
  Email: string;
  @Column('varchar')
  Phone: string;
}
