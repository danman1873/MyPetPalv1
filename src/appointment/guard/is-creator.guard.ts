import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/auth/controllers/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { AppointmentLog } from '../models/appointment.interface';
import { AppointmentService } from '../services/appointment.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private authService: AuthService, private appointmentService: AppointmentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: {id: number} } = request;

    if (!user || !params) return false;

    if (user.role === 'admin') return true; // allow admins to get make requests

    const userId = user.id;
    const appointmentId = params.id;

    // Determine if logged in user is the same as the user that created the pet
    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) => 
        this.appointmentService.findAppointmentById(appointmentId).pipe(
          map((appointmentLog: AppointmentLog) => {
            let isAuthor = user.id === appointmentLog.author.id;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}
