import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from '../leads/entities/lead.entity';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
    @InjectRepository(Lead)
    private leadsRepo: Repository<Lead>,
  ) {}

  async findByLead(leadId: number) {
    return this.repo.find({
      where: { lead: { id: leadId } },
      order: { createdAt: 'desc' },
    });
  }

  async create(leadId: number, dto: CreateCommentDto) {
    const lead = await this.leadsRepo.findOne({ where: { id: leadId } });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const comment = this.repo.create({ text: dto.text, lead });
    return this.repo.save(comment);
  }
}