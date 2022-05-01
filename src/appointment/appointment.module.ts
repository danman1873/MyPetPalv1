import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AppointmentController } from './controllers/appointment.controller';
import { IsCreatorGuard } from './guard/is-creator.guard';
import { AppointmentLogEntity } from './models/appointment.entity';
import { AppointmentService } from './services/appointment.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AppointmentLogEntity])],
  providers: [AppointmentService, IsCreatorGuard],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
