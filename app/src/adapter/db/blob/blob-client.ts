import { Injectable, NotImplementedException } from '@nestjs/common';
import { BlobClient } from 'src/application/interfaces/blob-client';

@Injectable()
export class BlobClientImplementation implements BlobClient {
  constructor() {}
  async deleteFile(): Promise<void> {
    throw new NotImplementedException();
  }

  async createFile(): Promise<void> {
    throw new NotImplementedException();
  }
  async fileExists(): Promise<boolean> {
    throw new NotImplementedException();
  }
}
