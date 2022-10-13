import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import { Moment } from '@polkadot/types/interfaces';
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Block } from '../entity/blocks';
import { Extrinsic } from '../entity/extrinsics';
import { Event } from '../entity/events';



const blocks_process = async (block_number:number,api:any)=>{
  if (block_number === 0){
    const block_height = block_number.toString();
    const blockHash = await api.rpc.chain.getBlockHash(block_number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const contentHash = signedBlock.block.contentHash.toString();
    const block_hash = signedBlock.block.hash.toString();
    const parent_block_hash = signedBlock.block.header.parentHash.toString();
    const state_hash = signedBlock.block.header.stateRoot.toString();
    const extrinsics_hash = signedBlock.block.header.extrinsicsRoot.toString();
    const utc_time = '-';
    const total_extrinsic_hash = signedBlock.block.extrinsics.hash.toString();
    // console.log('block_number=',block_number);
    // console.log('block_hash=',block_hash);
    // console.log('contentHash=',contentHash);
    // console.log('parent_block_hash=',parent_block_hash);
    // console.log('state_hash=',state_hash);
    // console.log('extrinsics_hash=',extrinsics_hash);
    // console.log('total_extrinsic_hash=',total_extrinsic_hash);
    // console.log('utc_time=',utc_time);
    const block = new Block();
    block.block_hash = block_hash;
    block.block_height = block_height;
    block.parent_block_hash = parent_block_hash;
    block.extrinsics_hash = extrinsics_hash;
    block.state_hash = state_hash;
    block.contentHash = contentHash;
    block.total_extrinsic_hash = total_extrinsic_hash;
    block.utc_time = utc_time;
    await AppDataSource.manager.save(block);
    console.log('Loading Block Success...');
  }else {
    const block_height = block_number.toString();
    const blockHash = await api.rpc.chain.getBlockHash(block_number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const block_hash = signedBlock.block.header.hash.toString();
    const contentHash = signedBlock.block.contentHash.toString();
    const parent_block_hash = signedBlock.block.header.parentHash.toString();
    const state_hash = signedBlock.block.header.stateRoot.toString();
    const extrinsics_hash = signedBlock.block.header.extrinsicsRoot.toString();
    const moment = signedBlock.block.extrinsics[0].args[0] as Compact<Moment>;
    const utc_time = new Date(moment.toNumber()).toUTCString();
    const total_extrinsic_hash = signedBlock.block.extrinsics.hash.toString();
    // console.log('block_number=', block_number);
    // console.log('block_hash=', block_hash);
    // console.log('contentHash=', contentHash);
    // console.log('parent_block_hash=', parent_block_hash);
    // console.log('state_hash=', state_hash);
    // console.log('extrinsics_hash=', extrinsics_hash);
    // console.log('total_extrinsic_hash=', total_extrinsic_hash);
    // console.log('utc_time=', utc_time);
    const block = new Block();
    block.block_hash = block_hash;
    block.block_height = block_height;
    block.parent_block_hash = parent_block_hash;
    block.extrinsics_hash = extrinsics_hash;
    block.state_hash = state_hash;
    block.contentHash = contentHash;
    block.total_extrinsic_hash = total_extrinsic_hash;
    block.utc_time = utc_time;
    await AppDataSource.manager.save(block);
    console.log('Loading Block Success...');
  }
};
const extrinsic_process = async (block_number:number,api:any) => {
  const block_height:string = block_number.toString();
  const blockHash = await api.rpc.chain.getBlockHash(block_number);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  const block_hash:string = signedBlock.block.header.hash.toString();
  const extrinsics = signedBlock.block.extrinsics;
  for (const [extrinsic_index,extrinsic] of extrinsics.entries()) {
    const isSigned = extrinsic.isSigned;
    const extrinsic_hash:string = extrinsic.hash.toString();
    const method = JSON.stringify(extrinsic.toHuman().method);
    if (!isSigned){
      const nonce = '-';
      const signature = '-';
      const signer = '-';
      const tip = '-';
      const bytes = extrinsic.toHex().toString();
      const weight_info:string = (await api.rpc.payment.queryInfo(bytes, blockHash)).toString();
      // console.log('block_number=',block_number);
      // console.log('extrinsic_index=',extrinsic_index);
      // console.log('extrinsic_hash=',extrinsic_hash);
      // console.log('method=',method);
      // console.log('nonce=',nonce);
      // console.log('signature=',signature);
      // console.log('signer=',signer);
      // console.log('tip=',tip);
      // console.log('weight_info=',weight_info);
      // console.log(block_number,block_height);
      const extrinsic_data = new Extrinsic();
      extrinsic_data.block_height = block_height;
      extrinsic_data.block_hash = block_hash;
      extrinsic_data.extrinsic_height = extrinsic_index.toString();
      extrinsic_data.extrinsic_hash = extrinsic_hash;
      extrinsic_data.method = method;
      extrinsic_data.nonce = nonce;
      extrinsic_data.signature = signature;
      extrinsic_data.signer = signer;
      extrinsic_data.tip = tip;
      extrinsic_data.weight_info = weight_info;
      await AppDataSource.manager.save(extrinsic_data);
      console.log('Loading Extrinsic Success...');
    }else{
      const nonce:string = extrinsic.nonce.toString();
      const signature:string = extrinsic.signature.toString();
      const signer:string = extrinsic.signer.toString();
      const tip:string = extrinsic.tip.toString();
      const bytes:string = extrinsic.toHex().toString();
      const weight_info:string = (await api.rpc.payment.queryInfo(bytes, blockHash)).toString();
      // console.log('block_number=',block_number);
      // console.log('extrinsic_index=',extrinsic_index);
      // console.log('extrinsic_hash=',extrinsic_hash);
      // console.log('method=',method);
      // console.log('nonce=',nonce);
      // console.log('signature=',signature);
      // console.log('signer=',signer);
      // console.log('tip=',tip);
      // console.log('weight_info=',weight_info);
      const extrinsic_data = new Extrinsic();
      extrinsic_data.block_height = block_height;
      extrinsic_data.block_hash = block_hash;
      extrinsic_data.extrinsic_height = extrinsic_index.toString();
      extrinsic_data.extrinsic_hash = extrinsic_hash;
      extrinsic_data.method = method;
      extrinsic_data.nonce = nonce;
      extrinsic_data.signature = signature;
      extrinsic_data.signer = signer;
      extrinsic_data.tip = tip;
      extrinsic_data.weight_info = weight_info;
      await AppDataSource.manager.save(extrinsic_data);
      console.log('Loading Extrinsic Success...');
    }
  }


  // for (const extrinsic of signedBlock.block.extrinsics) {
  //   const extrinsic_index: number = signedBlock.block.extrinsics.indexOf(extrinsic);
  //   const isSigned = extrinsic.toHuman().isSigned;
  //   if (!isSigned){
  //     const extrinsic_hash:string = extrinsic.hash.toString();
  //     const method:string = extrinsic.toHuman().method.toString();
  //     const nonce = '-';
  //     const signature = '-';
  //     const signer = '-';
  //     const tip = '-';
  //     const bytes = extrinsic.toHex().toString();
  //     const weight_info:string = (api.rpc.payment.queryInfo(bytes, blockHash)).toString();
  //     // console.log('block_number=',block_number);
  //     // console.log('extrinsic_hash=',extrinsic_hash);
  //     // console.log('method=',method);
  //     // console.log('nonce=',nonce);
  //     // console.log('signature=',signature);
  //     // console.log('signer=',signer);
  //     // console.log('tip=',tip);
  //     // console.log('weight_info=',weight_info);
  //   }else{
  //     const extrinsic_hash:string = extrinsic.hash.toString();
  //     const method:string = extrinsic.toHuman().method.toString();
  //     const nonce:string = extrinsic.toHuman().nonce.toString();
  //     const signature:string = extrinsic.toHuman().signature.toString();
  //     const signer:string = extrinsic.toHuman().signer.toString();
  //     const tip:string = extrinsic.toHuman().tip.toString();
  //     const bytes:string = extrinsic.toHex().toString();
  //     const weight_info:string = (api.rpc.payment.queryInfo(bytes, blockHash)).toString();
  //     // console.log('block_number=',block_number);
  //     // console.log('extrinsics_index=',extrinsics_index);
  //     // console.log('method=',method);
  //     // console.log('nonce=',nonce);
  //     // console.log('signature=',signature);
  //     // console.log('signer=',signer);
  //     // console.log('tip=',tip);
  //     // console.log('weight_info=',weight_info);
  //   }
  //   const extrinsic = new Extrinsic();
  //   extrinsic.block_height = block_height;
  //   extrinsic.block_hash = block_hash;
  //   extrinsic.extrinsic_height = extrinsic_index.toString();
  //   extrinsic.extrinsic_hash = extrinsic_hash;
  //   extrinsic.method = method;
  //   extrinsic.nonce = nonce;
  //   extrinsic.signature = signature;
  //   extrinsic.signer = signer;
  //   extrinsic.tip = tip;
  //   extrinsic.weight_info = weight_info;
  //   await AppDataSource.manager.save(extrinsic);
  //   console.log('Loading users from the database...');
  //
  // }
  // for (const extrinsics of signedBlock.block.extrinsics) {
  //   const extrinsics_index = signedBlock.block.extrinsics.indexOf(extrinsics);
  //   console.log(extrinsics_index);
  //   // const isSigned = extrinsics.toHuman().isSigned;
  //   // if (!isSigned){
  //   //   const extrinsic_hash:string = extrinsics.hash.toString();
  //   //   const method:string = extrinsics.toHuman().method.toString();
  //   //   const nonce = '-';
  //   //   const signature = '-';
  //   //   const signer = '-';
  //   //   const tip = '-';
  //   //   const bytes = extrinsics.toHex().toString();
  //   //   const weight_info:string = (await api.rpc.payment.queryInfo(bytes, blockHash)).toString();
  //   //   // console.log('block_number=',block_number);
  //   //   // console.log('extrinsic_hash=',extrinsic_hash);
  //   //   // console.log('method=',method);
  //   //   // console.log('nonce=',nonce);
  //   //   // console.log('signature=',signature);
  //   //   // console.log('signer=',signer);
  //   //   // console.log('tip=',tip);
  //   //   // console.log('weight_info=',weight_info);
  //   //   // const extrinsic = new Extrinsic();
  //   //   // extrinsic.block_height = block_height;
  //   //   // extrinsic.block_hash = block_hash;
  //   //   // extrinsic.extrinsic_height = extrinsics_index;
  //   //   // extrinsic.extrinsic_hash = extrinsic_hash;
  //   //   // extrinsic.method = method;
  //   //   // extrinsic.nonce = nonce;
  //   //   // extrinsic.signature = signature;
  //   //   // extrinsic.signer = signer;
  //   //   // extrinsic.tip = tip;
  //   //   // extrinsic.weight_info = weight_info;
  //   //   // await AppDataSource.manager.save(extrinsic);
  //   //   // console.log('Loading users from the database...');
  //   // }else{
  //   //   const extrinsic_hash:string = extrinsics.hash.toString();
  //   //   const method:string = extrinsics.toHuman().method.toString();
  //   //   const nonce:string = extrinsics.toHuman().nonce.toString();
  //   //   const signature:string = extrinsics.toHuman().signature.toString();
  //   //   const signer:string = extrinsics.toHuman().signer.toString();
  //   //   const tip:string = extrinsics.toHuman().tip.toString();
  //   //   const bytes:string = extrinsics.toHex().toString();
  //   //   const weight_info:string = (await api.rpc.payment.queryInfo(bytes, blockHash)).toString();
  //   //   // console.log('block_number=',block_number);
  //   //   // console.log('extrinsics_index=',extrinsics_index);
  //   //   // console.log('method=',method);
  //   //   // console.log('nonce=',nonce);
  //   //   // console.log('signature=',signature);
  //   //   // console.log('signer=',signer);
  //   //   // console.log('tip=',tip);
  //   //   // console.log('weight_info=',weight_info);
  //   //   // const extrinsic = new Extrinsic();
  //   //   // extrinsic.block_height = block_height;
  //   //   // extrinsic.block_hash = block_hash;
  //   //   // extrinsic.extrinsic_height = extrinsics_index;
  //   //   // extrinsic.extrinsic_hash = extrinsic_hash;
  //   //   // extrinsic.method = method;
  //   //   // extrinsic.nonce = nonce;
  //   //   // extrinsic.signature = signature;
  //   //   // extrinsic.signer = signer;
  //   //   // extrinsic.tip = tip;
  //   //   // extrinsic.weight_info = weight_info;
  //   //   // await AppDataSource.manager.save(extrinsic);
  //   //   // console.log('Loading users from the database...');
  //   // }
  // }
};
const events_process = async (block_number:number,api:any) =>{
  const block_height:string = block_number.toString();
  const blockHash = await api.rpc.chain.getBlockHash(block_number);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  const block_hash:string = signedBlock.block.header.hash.toString();
  const events = await api.query.system.events.at(blockHash);
  for (const [event_index,event] of events.entries()) {
    const event_info = JSON.stringify(event.toHuman().event);
    const ApplyExtrinsic = event.toHuman().phase.ApplyExtrinsic;
    // console.log('block_height=',block_height);
    // console.log('block_hash=',block_hash);
    // console.log('extrinsic_height=',ApplyExtrinsic);
    // console.log('event_index=',event_index);
    const event_data = new Event();
    event_data.block_height = block_height;
    event_data.block_hash = block_hash;
    event_data.extrinsic_height = ApplyExtrinsic;
    event_data.event_index = event_index.toString();
    event_data.event_info = event_info;
    await AppDataSource.manager.save(event_data);
    console.log('Loading Event Success...');
  }
};

const latest_block_height_check = async (api:any) => {
  const signedBlock = await api.rpc.chain.getBlock();
  // const latest_block_height = (signedBlock.toHuman()as any).block.header.number;
  const latest_block_height = signedBlock.toJSON().block.header.number;
  return latest_block_height;
};

const start_progress = async (start_block:number,api:any) =>{
  await blocks_process(start_block,api);
  await extrinsic_process(start_block,api);
  await events_process(start_block,api);
};

const loop_check = async (api:any) => {
  const last_block_height =  await AppDataSource.manager.count(Block);
  const latest_block_height = await latest_block_height_check(api);
  if (latest_block_height != last_block_height){
    for (let start_block = last_block_height; start_block < latest_block_height; start_block++) {
      await start_progress(start_block,api);
    }
    await loop_check(api);
  }else{
    setTimeout(async () =>{
      const last_block_height =  await AppDataSource.manager.count(Block);
      const latest_block_height = await latest_block_height_check(api);
      await loop_start_process(last_block_height,latest_block_height,api);
    },6000);
  }
};

const loop_start_process = async (last_block_height: number,latest_block_height: number, api:any) =>{
  for (let start_block = last_block_height; start_block < latest_block_height; start_block++) {
    await start_progress(start_block,api);
  }
  await loop_check(api);
};

const start_query_block_chain = async () => {
  const wsProvider = new WsProvider('ws://127.0.0.1:9945');
  const api = await ApiPromise.create({ provider: wsProvider });
  AppDataSource.initialize().then(async () => {
    const last_block_height =  await AppDataSource.manager.count(Block);
    const latest_block_height = await latest_block_height_check(api);
    await loop_start_process(last_block_height,latest_block_height,api);
  }).catch(error => console.log(error));
};

export default start_query_block_chain


