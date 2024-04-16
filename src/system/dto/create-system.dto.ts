import { IsNotEmpty, Length } from 'class-validator';

export class CreateSystemDto {
  @Length(2, 10)
  @IsNotEmpty()
  readonly command: string;
}
