import { FilmEntity } from "src/modules/films/entities/film.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("country")
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "country", type: "varchar", length: 128 })
  county: string;

  @ManyToOne(() => FilmEntity, (filmEntity) => filmEntity.countries)
  film: FilmEntity;
}