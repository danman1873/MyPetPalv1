import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { PetController } from './controllers/pet.controller';
import { IsCreatorGuard } from './guard/is-creator.guard';
import { PetLogEntity } from './models/pet.entity';
import { PetService } from './services/pet.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([PetLogEntity])],
    providers: [PetService, IsCreatorGuard],
    controllers: [PetController]
})
export class PetModule {}
