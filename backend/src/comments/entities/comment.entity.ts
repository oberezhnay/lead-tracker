import { Lead } from "../../leads/entities/lead.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Lead, (lead) => lead.comments, { onDelete: 'CASCADE' })
  lead: Lead;

  @CreateDateColumn()
  createdAt: Date;
}