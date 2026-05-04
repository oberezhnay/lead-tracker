import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from '../leads/entities/lead.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Lead])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
