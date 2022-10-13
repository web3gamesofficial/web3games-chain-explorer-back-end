import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Block } from './entity/blocks';
import { Extrinsic } from './entity/extrinsics';
import { Event } from './entity/events';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Block,Extrinsic,Event],
  migrations: [],
  subscribers: [],
});
