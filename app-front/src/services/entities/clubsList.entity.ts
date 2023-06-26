import { PaginationMetadata } from "./paginationMetadata.entity"

export class ClubInfoEntity {
    id!: number
    name!: string
    description!: string

    constructor(o : Partial<ClubInfoEntity>) {
        Object.assign(this, o)
    }
}

export class PaginizedClubInfoEntity {
    data!: ClubInfoEntity[]
    metadata!: PaginationMetadata

    constructor(o : Partial<PaginizedClubInfoEntity>) {
        Object.assign(this, o)
    }
}