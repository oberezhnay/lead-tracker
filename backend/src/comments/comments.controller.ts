import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('api/leads/:leadId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  findAll(@Param('leadId') leadId: string) {
    return this.commentsService.findByLead(Number(leadId));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  create(@Param('leadId') leadId: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(Number(leadId), dto);
  }
}
