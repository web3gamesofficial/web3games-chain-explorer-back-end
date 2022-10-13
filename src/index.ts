import * as path from "path";
import { WsServer } from "tsrpc";
import { serviceProto } from './shared/protocols/serviceProto';
import start_query_block_chain from "./scripts";
import {AppDataSource} from "./data-source";
import {Block} from "./entity/blocks";

// Create the Server
export const server = new WsServer(serviceProto, {
    port: 3001,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // TODO
    // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
    await init();
    await server.start();
    await start_query_block_chain();
}
main();
