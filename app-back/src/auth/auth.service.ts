import { ForbiddenException, Injectable } from '@nestjs/common';
import { loginDto, registerDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import {hash, verify} from 'argon2'
import { UserEntity } from 'src/@common/entities/user.entity';


@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService) {}

    async register(dto: registerDto) {
        dto.password = await hash(dto.password)
 
        return new UserEntity(await this.prismaService.user.create({
            data: {...dto}
        }))
    }

    async login(dto: loginDto) {
        const user = await this.prismaService.user.findUniqueOrThrow({where: {email: dto.email}})
        if (!await verify(user.password, dto.password))
            throw new ForbiddenException()

        return await this.signTokens(user.id)
    }

    async refresh(id: number, rt: string) {
        const user = await this.prismaService.user.findUniqueOrThrow({where: {id}})
        
        return await this.signTokens(user.id)
    }

    async signTokens(id : number) : Promise<{ token: string; rt_token: string; }> {
        return {
            token: await this.makeToken(id, this.configService.get('JWT_SECRET'), '60m'),
            rt_token: await this.makeToken(id, this.configService.get('JWT_SECRET_RT'), '1d'),
        }
    }

    private async makeToken(id : number, secret : string, expiresIn : string) {
        return await this.jwtService.signAsync({sub: id}, {secret, expiresIn})
    }

}
