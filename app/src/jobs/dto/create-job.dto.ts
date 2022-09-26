import {
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  IsBooleanString,
} from 'class-validator';


export class CreateJobDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  job_name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsBooleanString()
  useTest: string;

  @IsNumberString()
  chr: string;

  @IsNumberString()
  start_position: string;

  @IsNumberString()
  stop_position: string;

  @IsNumberString()
  alleles: string;

  @IsNumberString()
  strand: string;

}
