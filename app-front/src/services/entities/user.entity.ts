export class UserEntity {
    id!: number
    username!: string
    email!: string


    constructor(o : Partial<UserEntity>) {
        Object.assign(this, o)
    }
}