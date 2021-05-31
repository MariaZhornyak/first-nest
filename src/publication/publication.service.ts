import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ICurrentUser } from 'src/auth/interfaces/current-user.interface';
@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>
  ) {}

  async getPublicationsList(): Promise<Publication[]> {
    const publicationList = await this.publicationRepository.find();
    if (!publicationList) {
      throw new NotFoundException({
        success: false,
        message: `Publication list is empty`,
      });
    }
    return publicationList;
  }

  async getSinglePublication(id: string): Promise<Publication> {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException({
        success: false,
        message: `Publication #${id} not found`,
      });
    }
    return publication;
  }

  async createPublication(
    createPublicationDto: CreatePublicationDto,
    user: ICurrentUser
  ): Promise<Publication> {
    const publication = new Publication();

    publication.title = createPublicationDto.title;
    publication.publicationBody = createPublicationDto.publicationBody;
    publication.userId = user.id;

    await this.publicationRepository.save(publication);
    return publication;
  }

  async updatePublication(
    id: string,
    updatePublicationDto: CreatePublicationDto,
    user: ICurrentUser
  ): Promise<Publication> {
    const publication = await this.publicationRepository.findOne(id);

    if (!publication) {
      throw new NotFoundException({
        success: false,
        message: `Publication #${id} not found`,
      });
    }

    if (publication.userId != user.id) {
      throw new BadRequestException({
        success: false,
        message: 'Access denied',
      });
    }

    publication.title = updatePublicationDto.title;
    publication.publicationBody = updatePublicationDto.publicationBody;

    await this.publicationRepository.save(publication);
    return publication;
  }

  async deletePublication(
    id: string,
    user: ICurrentUser
  ): Promise<Publication> {
    const publication = await this.publicationRepository.findOne(id);

    if (!publication) {
      throw new NotFoundException({
        success: false,
        message: `Publication #${id} not found`,
      });
    }

    if (publication.userId != user.id) {
      throw new BadRequestException({
        success: false,
        message: 'Access denied',
      });
    }

    return await this.publicationRepository.remove(publication);
  }
}
