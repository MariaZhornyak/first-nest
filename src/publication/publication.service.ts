import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>
  ) {}

  async getPublicationsList(): Promise<Publication[]> {
    const publicationList = await this.publicationRepository.find();
    if (!publicationList) {
      throw new NotFoundException(`Publication list is empty`);
    }
    return publicationList;
  }

  async getSinglePublication(id: string): Promise<Publication> {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException(`Publication #${id} not found`);
    }
    return publication;
  }

  async createPublication(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    const { title, publicationBody, created, updated } = createPublicationDto;
    const userId = AuthMiddleware['userId'];
    const publication = new Publication();

    publication.title = title;
    publication.publicationBody = publicationBody;
    publication.created = created;
    publication.updated = updated;
    publication.userId = userId;

    await this.publicationRepository.save(publication);
    return publication;
  }

  async updatePublication(
    id: string,
    updatePublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    const { title, publicationBody, created, updated } = updatePublicationDto;
    const publication = await this.publicationRepository.findOne(id);

    if (publication.userId != AuthMiddleware['userId']) {
      console.log(AuthMiddleware['userId'], publication.userId);
    }

    publication.title = title;
    publication.publicationBody = publicationBody;
    publication.created = created;
    publication.updated = updated;

    await this.publicationRepository.save(publication);

    return publication;
  }

  async deletePulication(id: string): Promise<void> {
    const publication = await this.publicationRepository.findOne(id);
    await this.publicationRepository.remove(publication);
  }
}
