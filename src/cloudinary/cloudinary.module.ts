import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Module({ imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CloudinaryService],
})
export class CloudinaryModule {}
