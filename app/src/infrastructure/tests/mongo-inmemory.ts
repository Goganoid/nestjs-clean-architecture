import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const startMongoInMemory = async () => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
  }
  const uri = mongod.getUri();
  return uri;
};

export const stopMongoInMemory = async () => {
  if (mongod) {
    await mongod.stop();
  }
};
