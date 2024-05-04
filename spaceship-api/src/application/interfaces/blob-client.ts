export abstract class BlobClient {
  abstract createFile(fileName: string): Promise<void>;
  abstract deleteFile(fileName: string): Promise<void>;
  abstract fileExists(fileName: string): Promise<boolean>;
}
