import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationService } from './publication.service';
import { Publication } from './entities/publication.entity';

@Controller('posts')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  getPublicationList(): Promise<Publication[]> {
    return this.publicationService.getPublicationsList();
  }

  @Get(':id')
  getSinglePublication(@Param('id') id: string): Promise<Publication> {
    return this.publicationService.getSinglePublication(id);
  }

  @Post()
  createPublication(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    return this.publicationService.createPublication(createPublicationDto);
  }

  @Put(':id')
  updatePublication(
    @Body() updatePublicationDto: CreatePublicationDto,
    @Param('id') id: string
  ): Promise<Publication> {
    return this.publicationService.updatePublication(id, updatePublicationDto);
  }

  @Delete(':id')
  deletePublication(@Param('id') id: string): Promise<void> {
    return this.publicationService.deletePulication(id);
  }
}
