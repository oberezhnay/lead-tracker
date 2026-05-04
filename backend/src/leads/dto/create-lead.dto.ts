import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { LeadStatus } from "../entities/lead.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLeadDto {
  @ApiProperty({ description: 'Name of the lead', example: 'John Doe' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: 'Email of the lead', example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string; 

  @ApiProperty({ description: 'Company of the lead', example: 'ABC Inc.', required: false })
  @IsOptional()
  @IsString()
  company?: string; 

  @ApiProperty({ description: 'Status of the lead', example: 'new', enum: LeadStatus, required: false })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiProperty({ description: 'Value', example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  value?: number;
  
  @ApiProperty({ description: 'Additional notes', example: 'Interested in our product', required: false })  
  @IsOptional()
  @IsString()
  notes?: string;
}