"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_CLIENT = void 0;
exports.createRedisClient = createRedisClient;
const ioredis_1 = __importDefault(require("ioredis"));
function createRedisClient() {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    if (!host || !port) {
        throw new Error('Missing required Redis environment variables: REDIS_HOST, REDIS_PORT');
    }
    const client = new ioredis_1.default({
        host,
        port: parseInt(port, 10),
        maxRetriesPerRequest: 0,
        connectTimeout: 2000,
        lazyConnect: true,
        retryStrategy: () => null,
    });
    client.on('error', (err) => {
        console.error('[Redis] Connection error:', err.message);
    });
    return client;
}
exports.REDIS_CLIENT = Symbol('REDIS_CLIENT');
//# sourceMappingURL=redis.config.js.map