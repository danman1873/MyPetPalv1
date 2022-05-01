import { UserEntity } from "src/auth/controllers/models/userentity";
import { PetLogEntity } from "src/pet/models/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('appointment_log')
export class AppointmentLogEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date'})
    date: Date;

    @Column()
    description: string;

    @Column()
    petName: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.appointmentLog)
    author: UserEntity;
}