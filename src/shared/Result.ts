export class Result {
    isSuccess: boolean;
    errors: string[];
    
    protected constructor(isSuccess: boolean, errors: string[]) {
        this.isSuccess = isSuccess;
        this.errors = errors;
    }
    
    Successful = (): Result =>  new Result(true, null);
    NotFound = (): Result => new Result(false, ['No Encontrado'])
    OfErrors = (errors: string[]): Result => new Result(false, errors);
    OfError = (error: string): Result => new Result(false, [error])
}