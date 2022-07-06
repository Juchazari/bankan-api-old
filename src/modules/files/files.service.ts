import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { File } from './entities';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private publicFilesRepo: Repository<File>,
    private readonly configService: ConfigService
  ) {}

  async upload(file: Express.Multer.File, folder?: string): Promise<File> {
    const { buffer, originalname, mimetype } = file;
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        ACL: 'public-read',
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: buffer,
        Key: `${folder || 'entity'}/${uuid()}-${originalname}`,
        ContentType: mimetype
      })
      .promise();
    const newFile = this.publicFilesRepo.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });

    return await this.publicFilesRepo.save(newFile);
  }

  async deleteFile(id: number) {
    const file = await this.publicFilesRepo.findOne(id);
    const s3 = new S3();

    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key
      })
      .promise();

    await this.publicFilesRepo.delete(id);
  }
}
