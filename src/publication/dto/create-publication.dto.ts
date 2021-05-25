export class CreatePublicationDto {
  readonly title: string;
  readonly publicationBody: string;
  readonly created: Date;
  readonly updated: Date;
  readonly userId: string;
}
