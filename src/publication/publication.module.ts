import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { Publication } from './entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
