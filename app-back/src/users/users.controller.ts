import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtGuard, JwtGuardRt } from 'src/@common/guards';
import { patchUserDto } from './dto/patchUser.dto';
import { GetBody, GetUser } from 'src/@common/decorators';
import { deleteUserDto } from './dto/deleteUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { Validator } from 'src/@common/validators/validatorpipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get('u/:id')
    async getUser(@Param('id', new ParseIntPipe()) id: number) {
        return await this.usersService.getUser(id)
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@GetUser('sub') id: number) {
        return await this.usersService.getUser(id)
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    async patchMe(@GetUser('sub') id: number, @Body() dto: patchUserDto) {
        return await this.usersService.patchUser(id, dto)
    }

    @UseGuards(JwtGuard)
    @Delete('me')
    async deleteMe(@GetUser('sub') id : number, @Body() dto: deleteUserDto) {
        return await this.usersService.deleteUser(id, dto)
    }
}
