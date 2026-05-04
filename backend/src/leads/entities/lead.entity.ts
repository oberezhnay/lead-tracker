import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../../comments/entities/comment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  IN_PROGRESS = 'in_progress',
  WON = 'won',
  LOST = 'lost',
}

@Entity()
export class Lead {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  email?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  company?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @ApiProperty({ required: false })
  @Column({type: 'float', nullable: true})
  value?: number;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Comment, (comment) => comment.lead, { cascade: true })
  comments: Comment[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
