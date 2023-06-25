import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { ClubsController } from './clubs/clubs.controller';
import { VisitsController } from './visits/visits.controller';
import { ClubsService } from './clubs/clubs.service';
import { UsersService } from './users/users.service';
import { VisitsService } from './visits/visits.service';
import { VisitsModule } from './visits/visits.module';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, VisitsModule, UsersModule, ClubsModule, PrismaModule],
  controllers: [AppController, UsersController, ClubsController, VisitsController],
  providers: [AppService, ClubsService, UsersService, VisitsService],
})
export class AppModule {}
