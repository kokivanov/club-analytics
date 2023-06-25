import { Exclude, Type } from "class-transformer"
import { PaginationMetadata } from "./paginationMetadata.entity"

export class UserEntity {
    @Exclude()
    password: string

    username: string
    first_name: string
    last_name: string
    email: string


    constructor(o : Partial<UserEntity>) {
        Object.assign(this, o)
    }
}

export class PaginizedUserEntity {
    @Type(() => UserEntity)
    data: any[]
    @Type(() => PaginationMetadata)
    metadata: PaginationMetadata

    constructor(o : Partial<PaginizedUserEntity>) {
        Object.assign(this, o)
    }
}