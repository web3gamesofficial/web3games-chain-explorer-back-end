import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Block {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    block_height!: string;

    @Column()
    block_hash!: string;

    @Column()
    parent_block_hash!: string;

    @Column()
    extrinsics_hash!: string;

    @Column()
    state_hash!: string;

    @Column()
    contentHash!: string;

    @Column()
    total_extrinsic_hash!: string;

    @Column()
    utc_time!: string;
}
