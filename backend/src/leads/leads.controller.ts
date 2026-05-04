import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadsDto } from './dto/query-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Leads')
@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Lead created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page for pagination' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter leads by status' })
  @ApiQuery({ name: 'q', required: false, type: String, description: 'Search query' })  
  @ApiQuery({ name: 'sort', required: false, type: String, description: 'Field to sort by' })
  @ApiQuery({ name: 'order', required: false, type: String, description: 'Sort order (asc or desc)' })
  findAll(@Query() query: QueryLeadsDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Lead found successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })   
  findOne(@Param('id') id: string) {
    const numericId = Number(id);

    if (!id || isNaN(numericId)) {
      throw new BadRequestException('Invalid lead ID');
    }
    
    return this.leadsService.findOne(numericId);
  }

  @Get(':id/comments')
  @ApiResponse({ status: 200, description: 'Comments found successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  async getComments(@Param('id') id: string) {
    const numericId = Number(id);

    if (!id || isNaN(numericId)) {
      throw new BadRequestException('Invalid lead ID');
    }

    return this.leadsService.getComments(numericId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Lead updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' }) 
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Lead removed successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(Number(id));
  }
}
