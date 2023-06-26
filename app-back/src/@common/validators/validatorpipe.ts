import { ArgumentMetadata, Injectable, ValidationPipe } from "@nestjs/common";

@Injectable()
export class Validator extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        return await super.transform(value, metadata)
    }
}