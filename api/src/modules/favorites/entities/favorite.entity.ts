import { FilmEntity } from "src/modules/films/entities/film.entity";
import { UsersEntity } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("favorite")
export class FavoriteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "id", type: "uuid" })
  user_id: string;

  @Column({ name: "film_id", type: "uuid" })
  film_id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.favorites)
  users: UsersEntity;

  @ManyToOne(() => FilmEntity, (filmEntity) => filmEntity.favorites)
  film: FilmEntity;
}