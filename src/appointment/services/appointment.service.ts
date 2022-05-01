import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/controllers/models/user.interface';
import { Petfeed } from 'src/pet/models/petinterface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { AppointmentLogEntity } from '../models/appointment.entity';
import { AppointmentLog } from '../models/appointment.interface';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentLogEntity)
        private readonly appointmentLogRepository: Repository<AppointmentLogEntity>
    ) {}

    createAppointment(user: User, appointmentLog: AppointmentLog): Observable<AppointmentLog> {
        appointmentLog.author = user;
        return from(this.appointmentLogRepository.save(appointmentLog));
    }

    findAllAppointment(): Observable<AppointmentLog[]> {
        return from(this.appointmentLogRepository.find());
    }

    findAppointment(take: number = 10, skip: number = 0): Observable<AppointmentLog[]> {
        return from(
            this.appointmentLogRepository.createQueryBuilder('appointment')
            .innerJoinAndSelect('appointment.author', 'author')
            .take(take)
            .skip(skip)
            .getMany(),
        );
    }

    updateAppointment(id: number, appointmentLog: AppointmentLog): Observable<UpdateResult> {
        return from(this.appointmentLogRepository.update(id, appointmentLog));
    }

    deleteAppointment(id: number): Observable<DeleteResult> {
        return from(this.appointmentLogRepository.delete(id));
    }

    findAppointmentById(id: number): Observable<AppointmentLog> {
        return from(
            this.appointmentLogRepository.findOne({ id }, { relations: ['author'] }),
        );
    }


}
