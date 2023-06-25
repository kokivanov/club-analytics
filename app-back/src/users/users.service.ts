import { ForbiddenException, Injectable } from '@nestjs/common';
import { patchUserDto } from './dto/patchUser.dto';
import { deleteUserDto } from './dto/deleteUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/@common/entities/user.entity';
import { verify } from 'argon2'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUser(id: number) {
        return new UserEntity(await this.prismaService.user.findUniqueOrThrow({where: {id}}))
    }

    async patchUser(id: number, dto: patchUserDto) {
        return new UserEntity(await this.prismaService.user.update({
            data: {...dto},
            where: {id}
        }))
    }

    async deleteUser(id: number, dto: deleteUserDto) {
        const user = await this.prismaService.user.findUniqueOrThrow({where : {id}})
        if (!await verify(user.password, dto.password))
            throw new ForbiddenException()

        return new UserEntity(await this.prismaService.user.delete({where: {id}}))
    }
}
