import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;
  private bucketName: string; 
  private region: string;

  constructor() {
    this.region = process.env.AWS_REGION; // Obtener la región de las variables de entorno
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.AWS_BUCKET_NAME; // Nombre del bucket desde las variables de entorno
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    // URL actualizada para incluir la región
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
  } 

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return await Promise.all(uploadPromises);
  }
}
