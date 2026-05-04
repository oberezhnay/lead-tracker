import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { LeadStatus } from "../entities/lead.entity";

export class QueryLeadsDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string; 

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  sort?: 'createdAt' | 'updatedAt';

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}