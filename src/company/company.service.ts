import {Injectable} from '@nestjs/common';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Company} from "./entities/company.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserRoles} from "../commonds/Constants";


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        private readonly userService: UserService
    ) {}

    async create(createCompanyDto: CreateCompanyDto) {
        const newUserData = new CreateUserDto(createCompanyDto.name, createCompanyDto.email, createCompanyDto.password, createCompanyDto.phone, UserRoles.Company)
        const newUser = await this.userService.create(newUserData)
        createCompanyDto.userId = newUser.Id;

        return await this.companyRepository.save(createCompanyDto)
    }

    findAll() {
        return this.companyRepository.find();
    }

    findOne(id: number) {
        return this.companyRepository.findOne(id);
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        // return this.companyRepository.Update(id, updateCompanyDto);
    }

    remove(id: number) {
        return this.companyRepository.delete(id)
    }
}
