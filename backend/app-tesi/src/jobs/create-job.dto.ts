import { IsString, IsUrl } from 'class-validator';

export class CreateJobDto {
  title: string;
  description?: string;
  location?: string;
  type: string;

  @IsString()
  @IsUrl()
  referenceLink?: string;
}
