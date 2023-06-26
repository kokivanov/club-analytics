import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/@common/guards';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
    constructor(private clubsService: ClubsService) {}

    @UseGuards(JwtGuard)
    @Get('all')
    async getClubsList(@Query('page', new ParseIntPipe()) page : number, @Query('per_page', new ParseIntPipe()) per_page : number) {
        return await this.clubsService.getClubList(page, per_page)
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getClubStats(@Param('id', new ParseIntPipe()) club_id : number) {
        return await this.clubsService.getClubStats(club_id)
    }
}
