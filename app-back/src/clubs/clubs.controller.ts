import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/@common/guards';
import { ClubsService } from './clubs.service';
import { GetUser } from 'src/@common/decorators';

@Controller('clubs')
export class ClubsController {
    constructor(private readonly clubsService: ClubsService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    async getClubStats(@Param('id', new ParseIntPipe()) club_id : number) {
        return await this.clubsService.getClubStats(club_id)
    }

    @UseGuards(JwtGuard)
    @Get('all')
    async getClubsList(@GetUser('id') user_id : number) {
        return await this.clubsService.getClubList(user_id)
    }
}
