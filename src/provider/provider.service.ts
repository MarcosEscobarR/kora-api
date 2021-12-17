import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Provider} from "./entities/provider.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserRoles} from "../commonds/Constants";
import {UserService} from "../user/user.service";

@Injectable()
export class ProviderService {
  constructor(@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>, private readonly userService: UserService) {
  }
  
  async create(createProviderDto: CreateProviderDto) {
    const newUserData = new CreateUserDto( createProviderDto.Name,  createProviderDto.Email,  createProviderDto.Password,  createProviderDto.Phone, UserRoles.Provider)
    const newUser = await this.userService.create(newUserData)
     createProviderDto.userId = newUser.Id;
    
    return await this.providerRepository.save(createProviderDto);
  }

  async findAll() {
    return await this.providerRepository.find()
  }

  async findOne(id: number) {
    return await this.providerRepository.findOne(id);
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    let provider = await this.providerRepository.findOne(id)
    provider = {...provider, ...updateProviderDto};
    return await this.providerRepository.update(id, provider);
  }

  async remove(id: number) {
    return await this.providerRepository.delete(id);
  }
}
