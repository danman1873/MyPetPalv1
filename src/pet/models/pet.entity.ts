import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from 'src/auth/controllers/models/userentity';
import { AppointmentLogEntity } from "src/appointment/models/appointment.entity";

@Entity('pet_log')
export class PetLogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column()
    weight: number;

    @Column({ default: '' })
    type: string;

    @Column({ type: 'time without time zone' })
    feedingTime: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.petLog)
    author: UserEntity;
}