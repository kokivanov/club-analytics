import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClubStatsEntity, ageStats, weeklyStats } from 'src/@common/entities/clubStats.entity';
import { PaginizedClubInfoEntity } from 'src/@common/entities/clubsList.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClubsService {
    constructor(private readonly prismaClient: PrismaService) {}

    async getClubList(page : number, per_page : number) {
        return new PaginizedClubInfoEntity({data: await this.prismaClient.club.findMany({take: per_page, skip: (page-1)*per_page}), metadata: {current_page: page, total: Math.ceil(await this.prismaClient.club.count() / per_page)}})
    } 

    async getClubStats(club_id : number) {
        const ws_tmp = await this.prismaClient.week_stats.findMany({where: {club_id}, orderBy: {wday:  'desc'}})
        const ws = new weeklyStats({
            'Неділя' : ws_tmp[0].avg_visits,
            'Понеділок' : ws_tmp[1].avg_visits,
            'Вівторок' : ws_tmp[2].avg_visits,
            'Середа' : ws_tmp[3].avg_visits,
            'Четвер' : ws_tmp[4].avg_visits,
            "П'ятниця": ws_tmp[5].avg_visits,
            'Субота' : ws_tmp[6].avg_visits
        })

        const as_temp = await this.prismaClient.age_stats.findMany({where: {club_id}, orderBy: {age: 'asc'}})
        const as = new ageStats({
            '12-17' : as_temp[0].count,
            '18-24' : as_temp[1].count,
            '25-31' : as_temp[2].count,
            '32-37' : as_temp[3].count,
            '38-45' : as_temp[4].count,
            '46-55' : as_temp[5].count,
            '56-70' : as_temp[6].count,
            '71+' : as_temp[7].count
        })

        return new ClubStatsEntity({
            name: (await this.prismaClient.club.findUnique({where: {id: club_id}})).name,
            weekStats: ws,
            byAge: as,
            timeStartMean: (await this.prismaClient.avg_time.findUnique({where: {club_id}})).avg_time,
            trainingAmountMean: (await this.prismaClient.avg_per_week.findUnique({where : {club_id}})).avg,
            withTutor: (await this.prismaClient.visit.count({where: {AND: {club_id, with_tutor: {
                equals: true
            }}}})) / (await this.prismaClient.visit.count({where: {club_id}})),
            trainingTimeMean: (await this.prismaClient.visit.aggregate({_avg: {
                duration: true
            }, where: {club_id}}))._avg.duration
        })
    }

}
