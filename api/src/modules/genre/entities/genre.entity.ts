import { FilmEntity } from "../../films/entities/film.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("genre")
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "genre", type: "varchar", length: 128 })
  genre: string;

  @ManyToOne(() => FilmEntity, (filmEntity) => filmEntity.genres)
  film: FilmEntity;
}