import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';

@Module({
    imports: [PrismaModule],
    providers: [ClubsService],
    controllers: [ClubsController]
})
export class ClubsModule {}
