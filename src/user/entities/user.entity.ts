import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserRoles} from "../../commonds/Constants";

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
  @Column("simple-enum")
  Role: UserRoles
  
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt)
  }
  
  async validatePassword(password: string) {
    return bcrypt.compareSync(password, this.Password);
  }
}
