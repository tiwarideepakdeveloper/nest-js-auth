import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class TblUser{
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ length: 15 })
    user_first_name: string;

    @Column({ length: 15 })
    user_last_name: string;

    @Column({ unique: true })
    user_email: string;

    @Column({ length: 15 })
    user_phone_number: string;

    @Column()
    user_password: string;
    
    @Column({
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    user_created_at: string;
}