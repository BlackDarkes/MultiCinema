import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("news")
export class NewsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "image", type: "varchar", length: 255 })
  image: string;

  @Column({ name: "title", type: "varchar", length: 128 })
  title: string;

  @Column({ name: "body", type: "text" })
  body: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}