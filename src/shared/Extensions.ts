// @ts-ignore

import {Result} from "./Result";
import {HttpStatus} from "@nestjs/common";

declare  module '../shared/Result'{
    interface Result {
        toHttpResponse(): void
    }
}

Result.prototype.toHttpResponse = () => {
    console.log(this)
}