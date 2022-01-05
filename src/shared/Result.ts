import {HttpException} from "@nestjs/common";

export class Result {
    isSuccess: boolean;
    errors: string[];
    
     constructor(isSuccess: boolean, errors: string[]) {
        this.isSuccess = isSuccess;
        this.errors = errors;
    }
    
    static Successful = (): Result =>  new Result(true, null);
    static NotFound = (): Result => new Result(false, ['No Encontrado'])
    static OfErrors = (errors: string[]): Result => new Result(false, errors);
    static OfError = (error: string): Result => new Result(false, [error])

    toCreatedHttpResponse = () => {
        return this.isSuccess ? {statusCode: 201} : new HttpException({status: 500, body: this.errors as any} as Response, 500)
    }

    toHttpResponse = () => {
        return this.isSuccess ? {statusCode: 200} : new HttpException({status: 500, body: this.errors as any} as Response, 500)
    }
}