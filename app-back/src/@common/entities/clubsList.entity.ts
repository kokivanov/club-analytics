import { Type } from "class-transformer"
import { PaginationMetadata } from "./paginationMetadata.entity"

export class ClubInfoEntity {
    name: string
    description: string

    constructor(o : Partial<ClubInfoEntity>) {
        Object.assign(this, o)
    }
}

export class PaginizedClubInfoEntity {
    @Type(() => ClubInfoEntity)
    data: any[]
    @Type(() => PaginationMetadata)
    metadata: PaginationMetadata

    constructor(o : Partial<PaginizedClubInfoEntity>) {
        Object.assign(this, o)
    }
}