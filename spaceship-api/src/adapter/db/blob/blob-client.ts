import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobClient } from 'src/application/interfaces/blob-client';

@Injectable()
export class BlobClientImplementation implements BlobClient {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow('S3_BUCKET');
    const s3Endpoint = this.configService.get('S3_ENDPOINT');
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('S3_REGION'),
      ...(s3Endpoint && {
        endpoint: s3Endpoint,
        forcePathStyle: true,
      }),
      credentials: {
        accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('S3_ACCESS_KEY'),
      },
    });
  }
  async deleteFile(fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });
    await this.s3Client.send(command);
  }

  async createFile(fileName: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });
    await this.s3Client.send(command);
  }
  async fileExists(fileName: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });
    try {
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      if (
        error.$metadata?.httpStatusCode === 404 ||
        error.$metadata?.httpStatusCode === 403
      ) {
        return false;
      }
      throw error;
    }
  }
}
