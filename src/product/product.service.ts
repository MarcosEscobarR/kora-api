import {Inject, Injectable, Scope} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProviderService} from "../provider/provider.service";
import {MeasurementUnits} from "../commonds/Constants";
import {GetProductDto} from "./dto/get-product.dto";
import {CurrentUserService} from "../commonds/current-user/current-user.service";
import {Result} from "../shared/Result";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
              private readonly providerService: ProviderService,
              private readonly currentUserService: CurrentUserService
              ) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product[]> {
    const provider = await this.providerService.findOne(createProductDto.providerId)
    const products = createProductDto.products.map(p => new Product(p.name, MeasurementUnits[p.measurementUnit], p.quantity, provider))
    return await this.productRepository.save(products)
  }

  async findAll(skip: number, take: number) : Promise<GetProductDto[]>{
    const currentUser = await this.currentUserService.getCurrentUser();
    const {Id} =  await this.providerService.findByUser(currentUser)
    
    const result = await this.productRepository
        .createQueryBuilder("provider")
        .where("provider.providerId = :providerId", {providerId: Id})
        .skip(skip * take)
        .take(take)
        .getMany();
    
    return result.map<GetProductDto>(p => ({id: p.Id, quantity: p.Quantity, name: p.Name, measureUnit: p.MeasurementUnits.toString()}))
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
