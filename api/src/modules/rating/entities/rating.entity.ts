import { FilmEntity } from "src/modules/films/entities/film.entity";
import { UsersEntity } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("rating")
export class RatingEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "film_id", type: "uuid" })
  filmId: string;

  @Column({ name: "score", type: "int" })
  score: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.ratings)
  users: UsersEntity;

  @ManyToOne(() => FilmEntity, (filmEntity) => filmEntity.ratings)
  film: FilmEntity;
}