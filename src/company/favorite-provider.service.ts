import {Injectable, Res} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FavoriteProviders} from "./entities/favoriteProviders.entity";
import {Repository} from "typeorm";
import {CurrentUserService} from "../commonds/current-user/current-user.service";
import {Result} from "../shared/Result";
import {CreateFavoriteProviderDto} from "./dto/create-favorite-provider.dto";
import {CompanyService} from "./company.service";
import {FavoriteProviderHeaderModel} from "./dto/favorite-provider-header-model";

@Injectable()
export class FavoriteProviderService {
    constructor(@InjectRepository(FavoriteProviders) private readonly repository: Repository<FavoriteProviders>,
                private readonly currentUserService: CurrentUserService,
                private readonly companyService: CompanyService
                ) {}
    
    async create(createDto: CreateFavoriteProviderDto): Promise<Result> {
        const provider = await this.currentUserService.getCurrentProvider();
        const company = await this.companyService.findOne(createDto.companyId);
        const favorite: FavoriteProviders = new FavoriteProviders(company, provider);
        
        try {
            await this.repository.save(favorite)
            return Result.Successful();
        } catch (e) {
            return Result.OfError(e)
        }
    }
    
    async findAll(skip: number, take: number): Promise<FavoriteProviderHeaderModel[]> {
        const {Id} = await this.currentUserService.getCurrentProvider()

        const result = await this.repository
            .createQueryBuilder('favorite')
            .where('providerId = :id', {id: Id})
            .innerJoinAndSelect("favorite.Company", "Company")
            .skip(skip * take)
            .take(take)
            .getMany();

        return result.map<FavoriteProviderHeaderModel>(p => ({Id: p.Id, companyId: p.Company.Id}))
    }
    
    async delete(id: number): Promise<Result> {
        try {
            await this.repository
                .createQueryBuilder('favorite')
                .where("id = :id", {id})
                .delete()
                .execute();
            
            return Result.Successful()
        } catch (e) {
            return Result.OfError(e)
        }
    }
}