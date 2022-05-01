import { RouterModule } from "@nestjs/core";
import { AppointmentLogEntity } from "src/appointment/models/appointment.entity";
import { FeedPostEntity } from "src/feed/models/postentity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PetLogEntity } from "../../../pet/models/pet.entity";
import { Role } from "./role.enum";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
    feedPosts: FeedPostEntity[];

    @OneToMany(() => PetLogEntity, (petLogEntity) => petLogEntity.author)
    petLog: PetLogEntity[];

    @OneToMany(() => AppointmentLogEntity, (appointmentLogEntity) => appointmentLogEntity.author)
    appointmentLog: AppointmentLogEntity[];
}