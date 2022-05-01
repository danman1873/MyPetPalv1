import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/controllers/models/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IsCreatorGuard } from '../guard/is-creator.guard';
import { AppointmentLog } from '../models/appointment.interface';
import { AppointmentService } from '../services/appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private appointmentLog: AppointmentService) {}

    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    create(@Body() appointmentLog: AppointmentLog, @Request() req): Observable<AppointmentLog> {
        return this.appointmentLog.createAppointment(req.user, appointmentLog)
    }

    @Get()
    findSelected(
        @Query('take') take: number = 1, 
        @Query('skip') skip: number = 1,
    ): Observable<AppointmentLog[]> {
        return this.appointmentLog.findAppointment(take, skip);
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() appointmentLog: AppointmentLog,
    ):Observable<UpdateResult> {
        return this.appointmentLog.updateAppointment(id, appointmentLog);
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete( @Param('id') id: number): Observable<DeleteResult> {
        return this.appointmentLog.deleteAppointment(id);
    }
}
