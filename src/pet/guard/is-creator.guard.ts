import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/auth/controllers/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { Petfeed } from '../models/petinterface';
import { PetService } from '../services/pet.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private authService: AuthService, private petService: PetService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: {id: number} } = request;

    if (!user || !params) return false;

    if (user.role === 'admin') return true; // allow admins to get make requests

    const userId = user.id;
    const petId = params.id;

    // Determine if logged in user is the same as the user that created the pet
    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) => 
        this.petService.findPetById(petId).pipe(
          map((petFeed: Petfeed) => {
            let isAuthor = user.id === petFeed.author.id;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}
