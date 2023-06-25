export class PaginationMetadata {
    current_page: number
    total: number

    constructor(o: Partial<PaginationMetadata>) {
        Object.assign(this, o)
    }
}