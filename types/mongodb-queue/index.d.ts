// Type definitions for mongodb-queue 4.0
// Project: https://github.com/chilts/mongodb-queue
// Definitions by: FiveOFive <https://github.com/FiveOFive>
// Definitions updated by: John C. Kennedy <https://github.com/codejockie>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.2

import { Db, MongoError } from 'mongodb';

declare function mongodbQueue(db: Db, name: string, opts?: mongodbQueue.QueueOptions): mongodbQueue.Queue;

declare namespace mongodbQueue {
    class Queue {
        constructor(db: Db, name: string, opts?: QueueOptions);

        createIndexes(callback: QueueCallback<string>): void;
        add(payload: Payload, callback: QueueCallback<string>): void;
        add(payload: Payload, opts: QueueOptions, callback: QueueCallback<string>): void;
        get(callback: QueueCallback<QueueMessage | undefined>): void;
        get(opts: QueueOptions, callback: QueueCallback<QueueMessage | undefined>): void;
        ping(ack: string, callback: QueueCallback<string>): void;
        ping(ack: string, opts: QueueOptions, callback: QueueCallback<string>): void;
        ack(ack: string, callback: QueueCallback<string>): void;
        clean(callback: QueueCallback<any>): void;
        total(callback: QueueCallback<number>): void;
        size(callback: QueueCallback<number>): void;
        inflight(callback: QueueCallback<number>): void;
        done(callback: QueueCallback<number>): void;
    }

    type Payload = string | Record<string, unknown> | Array<string | Record<string, unknown>>;

    interface QueueOptions {
        deadQueue?: Queue;
        delay?: number;
        maxRetries?: number;
        visibility?: number;
    }

    interface QueueMessage {
        ack: string;
        id: string;
        payload: string;
        tries: number;
    }

    interface QueueCallback<T> {
        (err: MongoError | Error, result: T): void;
    }
}

export = mongodbQueue;
