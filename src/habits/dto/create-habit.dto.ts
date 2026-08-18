import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHabitDto {
  @IsString({ message: 'Name must be a string, wrapped in double quotes' })
  @IsNotEmpty()
  'name': string;

  @IsString()
  @MinLength(5)
  @MaxLength(10)
  'description': string;

  @IsDateString({}, { message: 'Date must be in YYYY-MM-DD format' })
  'startDate': string;

  @IsUUID()
  'userId': string;
}
