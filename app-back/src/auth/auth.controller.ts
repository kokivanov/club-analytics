import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/@common/decorators';
import { JwtGuardRt } from 'src/@common/guards';
import { AuthService } from './auth.service';
import { loginDto, registerDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto : loginDto) {
        return await this.authService.login(dto)
    }

    @Post('register')
    async register(@Body() dto : registerDto) {
        return await this.authService.register(dto)
    }

    @UseGuards(JwtGuardRt)
    @Post('refresh')
    async refresh(@GetUser() user: {sub : number, rt_token : string}) {
        return await this.authService.refresh(user.sub, user.rt_token)
    }

}
