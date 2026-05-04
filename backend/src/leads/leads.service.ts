import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadsDto } from './dto/query-lead.dto';
import { ILike, Not } from 'typeorm';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private repo: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = this.repo.create(dto);
    return this.repo.save(lead);  
  }

  async findAll(query: QueryLeadsDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const qb = this.repo.createQueryBuilder('lead');

    const where: any = {};

    if (query.status) {
      qb.andWhere('lead.status = :status', { status: query.status });
      // where.status = query.status;
    } 

    if (query.q) {
      qb.andWhere(`(lead.name ILike :q OR lead.email ILike :q OR lead.company ILike :q)`, { q: `%${query.q}%` });
    }

    const allowedSort = ['createdAt', 'updatedAt'];
    const sortField = allowedSort.includes(query.sort) ? query.sort : 'createdAt';
    const allowedOrder = ['asc', 'desc'];
    const sortOrder = allowedOrder.includes(query.order) ? query.order.toUpperCase() : 'DESC';
      qb.orderBy(`lead.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
      qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();

    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const lead = await this.repo.findOne({ where: { id }, relations: ['comments'] })
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead;
  }

  async getComments(id: number) {
    const lead = await this.repo.findOne({ where: { id }, relations: ['comments'] });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead.comments;
  }

  async update(id: number, dto: UpdateLeadDto) {
    const lead = await this.repo.findOne({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    Object.assign(lead, dto);
    return this.repo.save(lead);
  }

  async remove(id: number) {
    const lead = await this.repo.findOne({ where: { id } });
    return this.repo.remove(lead);
  }
}