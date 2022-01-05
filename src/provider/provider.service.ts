import {Injectable} from '@nestjs/common';
import {CreateProviderDto} from './dto/create-provider.dto';
import {UpdateProviderDto} from './dto/update-provider.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Provider} from "./entities/provider.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserRoles} from "../commonds/Constants";
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";

@Injectable()
export class ProviderService {
  constructor(@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>, 
              private readonly userService: UserService) {}
  
  async create(createProviderDto: CreateProviderDto) {
    const newUserData = new CreateUserDto( createProviderDto.Name,  createProviderDto.Email,  createProviderDto.Password,  createProviderDto.Phone, UserRoles.Provider)
    createProviderDto.user = await this.userService.create(newUserData);
    
    const provider: Provider = new Provider(createProviderDto.Dni, createProviderDto.user);
    return await this.providerRepository.save(provider);
  }

  async findAll() {
    return await this.providerRepository.find()
  }

  async findOne(id: number) {
    return await this.providerRepository.findOne(id);
  }
  
  async findByUser(user: User): Promise<Provider> {
    return await this.providerRepository.findOne({User: user})
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
