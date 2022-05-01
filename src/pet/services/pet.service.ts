import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/controllers/models/user.interface';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { PetLogEntity } from '../models/pet.entity';
import { Petfeed } from '../models/petinterface';


@Injectable()
export class PetService {
    constructor(
        @InjectRepository(PetLogEntity)
        private readonly petLogRepository: Repository<PetLogEntity>
    ) {}

    createPet(user: User, petFeed: Petfeed): Observable<Petfeed> {
        petFeed.author = user;
        return from(this.petLogRepository.save(petFeed));
    }

    findAllPets(): Observable<Petfeed[]> {
        return from(this.petLogRepository.find());
    }

    // findPets(take: number = 10, skip: number = 0): Observable<Petfeed[]> {
    //     return from(this.petLogRepository.findAndCount({ take, skip }).then (([pets]) => {
    //         return <Petfeed[]>pets;
    //         }),
    //     );
    // }

    findPets(take: number = 10, skip: number = 0): Observable<Petfeed[]> {
        return from(
            this.petLogRepository.createQueryBuilder('pets')
            .innerJoinAndSelect('pets.author', 'author')
            .take(take)
            .skip(skip)
            .getMany(),
        );
    }

    updatePet(id: number, petFeed: Petfeed): Observable<UpdateResult> {
        return from(this.petLogRepository.update(id, petFeed));
    }

    deletePet(id: number): Observable<DeleteResult> {
        return from(this.petLogRepository.delete(id));
    }

    findPetById(id: number): Observable<Petfeed> {
        return from(
            this.petLogRepository.findOne({ id }, { relations: ['author'] }),
        );
    }
}
