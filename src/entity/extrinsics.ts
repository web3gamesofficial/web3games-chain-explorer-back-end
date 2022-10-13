import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Extrinsic {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    block_height!: string;

    @Column()
    block_hash!: string;

    @Column()
    extrinsic_height!: string;

    @Column()
    extrinsic_hash!: string;

    @Column()
    method!: string;

    @Column()
    nonce!: string;

    @Column()
    signature!: string;

    @Column()
    signer!: string;

    @Column()
    tip!: string;

    @Column()
    weight_info!: string;
}
