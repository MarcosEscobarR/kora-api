import {Injectable} from '@nestjs/common';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Company} from "./entities/company.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserRoles} from "../commonds/Constants";
import {User} from "../user/entities/user.entity";


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        private readonly userService: UserService
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<any> {
        const password = await User.hashPassword(createCompanyDto.password)
        const newUserData = new CreateUserDto(createCompanyDto.name, createCompanyDto.email, password, createCompanyDto.phone, UserRoles.Company)
        createCompanyDto.user = await this.userService.create(newUserData);
        
        const company: Company = new Company(createCompanyDto.user, createCompanyDto.Ruc)
        return await this.companyRepository.save(company)
    }

    findAll() {
        return this.companyRepository.find();
    }

    findOne(id: number): Promise<Company> {
        return this.companyRepository.findOne(id);
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        // return this.companyRepository.Update(id, updateCompanyDto);
    }

    remove(id: number) {
        return this.companyRepository.delete(id)
    }
}
