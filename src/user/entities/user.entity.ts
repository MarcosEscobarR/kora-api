import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserRoles} from "../../commonds/Constants";

@Entity()
export class User {
  constructor(name: string, email: string, password: string, phone: string, role: UserRoles ) {
    this.Name = name;
    this.Email = email;
    this.Password = password;
    this.Phone = phone;
    this.Role = role;
  }
  
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @Column('varchar')
  Password: string;
  @Column('varchar')
  Email: string;
  @Column('varchar')
  Phone: string;
  @Column("simple-enum")
  Role: UserRoles
  
  @BeforeInsert()
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return  await bcrypt.hash(password, salt)
  }
  
  async validatePassword(password: string) {
    return bcrypt.compareSync(password, this.Password);
  }
}
