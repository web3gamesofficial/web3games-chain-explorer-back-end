import { Entity,  Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    block_height!: string;

    @Column()
    block_hash!: string;

    @Column()
    extrinsic_height!: string;

    @Column()
    event_index!: string;

    @Column()
    event_info!: string;

}
