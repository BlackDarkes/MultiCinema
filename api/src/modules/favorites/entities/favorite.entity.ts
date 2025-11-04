import { FilmEntity } from "../../films/entities/film.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("favorite")
export class FavoriteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "film_id", type: "uuid" })
  filmId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.favorites)
  users: UsersEntity;

  @ManyToOne(() => FilmEntity, (filmEntity) => filmEntity.favorites)
  film: FilmEntity;
}