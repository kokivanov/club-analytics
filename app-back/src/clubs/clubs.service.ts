import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClubsService {
    constructor(private readonly prismaClient: PrismaClient) {}

    async getClubList(user_id : number) {
        this.prismaClient.$transaction(async () => {

        })
    } 

    async getClubStats(club_id : number) {
        
    }

}
