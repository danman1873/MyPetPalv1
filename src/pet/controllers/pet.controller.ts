import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Query } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from 'src/auth/controllers/models/role.enum';
import { User } from 'src/auth/controllers/models/user.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IsCreatorGuard } from '../guard/is-creator.guard';
import { Petfeed } from '../models/petinterface';
import { PetService } from '../services/pet.service';

@Controller('pet')
export class PetController {
    constructor(private petFeed: PetService) {}
    
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    create(@Body() petFeed: Petfeed, @Request() req): Observable<Petfeed> {
        return this.petFeed.createPet(req.user, petFeed)
    }

    // @Get()
    // findAll():Observable<Petfeed[]> {
    //     return this.petFeed.findAllPets();
    // }

    @Get()
    findSelected(
        @Query('take') take: number = 1, 
        @Query('skip') skip: number = 1,
    ): Observable<Petfeed[]> {
        return this.petFeed.findPets(take, skip);
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() petFeed: Petfeed,
    ):Observable<UpdateResult> {
        return this.petFeed.updatePet(id, petFeed);
    }


    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete( @Param('id') id: number): Observable<DeleteResult> {
        return this.petFeed.deletePet(id);
    }
}
