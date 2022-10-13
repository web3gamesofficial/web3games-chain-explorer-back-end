import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqSend, ResSend } from "../shared/protocols/PtlSend";
import {AppDataSource} from "../data-source";
import {Block} from "../entity/blocks";
// This is a demo code file
// Feel free to delete it

export default async function (call: ApiCall<ReqSend, ResSend>) {
    // Error
    if (call.req.content.length === 0) {
        await call.error('Content is empty')
        return;
    }

    // Success
    let time = new Date();
    call.succ({
        time: time
    });

    if (!AppDataSource.isInitialized){
        AppDataSource.initialize().then(async () => {
            const blocks = await AppDataSource.manager.getRepository(Block)
                .createQueryBuilder('block')
                .orderBy('id', 'DESC')
                .take(10)
                .getMany();
            console.log(typeof blocks);
            await server.broadcastMsg('Chat', {
                content: JSON.stringify(blocks),
                time: new Date()
            })
        }).catch(error => console.log(error));
    }else {
        const blocks = await AppDataSource.manager.getRepository(Block)
            .createQueryBuilder('block')
            .orderBy('id', 'DESC')
            .take(10)
            .getMany();
        console.log(blocks);
        await server.broadcastMsg('Chat', {
            content: JSON.stringify(blocks),
            time: new Date()
        })
    }
}
