import { FavoriteEntity } from "src/modules/favorites/entities/favorite.entity";
import { ForumEntity } from "src/modules/forum/entities/forum.entity";
import { RatingEntity } from "src/modules/rating/entities/rating.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "varchar", length: 80 })
  name: string;

  @Column({ name: "email", type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password: string;

  @Column({ name: "city", type: "varchar", length: 255, nullable: true, default: null })
  city: string;

  @Column({ name: "description", type: "text", nullable: true, default: null })
  description: string;

  @Column({ name: "avatar", type: "varchar", length: 255, nullable: true, default: null })
  avatar: string;

  @Column({ name: "social", type: "varchar", length: 255, array: true, nullable: true, default: null })
  social: string[];

  @Column({ name: "subscribe", type: "boolean", default: false })
  subscribe: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @OneToMany(() => ForumEntity, (forumEntity) => forumEntity.users)
  forums: ForumEntity[];

  @OneToMany(() => FavoriteEntity, (favoriteEntity) => favoriteEntity.users)
  favorites: FavoriteEntity[];

  @OneToMany(() => RatingEntity, (ratingEntity) => ratingEntity.users)
  ratings: RatingEntity[];
}