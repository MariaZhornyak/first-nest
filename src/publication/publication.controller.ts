import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationService } from './publication.service';
import { Publication } from './entities/publication.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ICurrentUser } from 'src/auth/interfaces/current-user.interface';

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
  @UseGuards(AuthGuard)
  createPublication(
    @Body() createPublicationDto: CreatePublicationDto,
    @CurrentUser() user: ICurrentUser
  ): Promise<Publication> {
    return this.publicationService.createPublication(
      createPublicationDto,
      user
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updatePublication(
    @Body() updatePublicationDto: CreatePublicationDto,
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string
  ): Promise<Publication> {
    return this.publicationService.updatePublication(
      id,
      updatePublicationDto,
      user
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deletePublication(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser
  ): Promise<Publication> {
    return this.publicationService.deletePublication(id, user);
  }
}
