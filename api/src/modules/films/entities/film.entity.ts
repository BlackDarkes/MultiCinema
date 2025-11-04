import { CountryEntity } from "../../country/entities/country.entity";
import { FavoriteEntity } from "../../favorites/entities/favorite.entity";
import { GenreEntity } from "../../genre/entities/genre.entity";
import { RatingEntity } from "../../rating/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("film")
export class FilmEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "image", type: "varchar", length: 255 })
	image: string;

	@Column({ name: "name", type: "varchar", length: 128 })
	name: string;

	@Column({ name: "type", type: "varchar", length: 255 })
	type: string;

	@Column({ name: "time", type: "varchar", length: 30 })
	time: string;

	@Column({ name: "country", type: "int" })
	country: number;

	@Column({ name: "director", type: "varchar", length: 80 })
	director: string;

	@Column({ name: "genres", type: "int", array: true })
	genre: number[];

  @Column({ name: "year", type: "varchar", length: 9 })
  year: string;

  @OneToMany(() => CountryEntity, (countryEntity) => countryEntity.film)
  countries: CountryEntity[];

  @OneToMany(() => GenreEntity, (genreEntity) => genreEntity.film)
  genres: GenreEntity[];

  @OneToMany(() => FavoriteEntity, (favoriteEntity) => favoriteEntity.film)
  favorites: FavoriteEntity[];

  @OneToMany(() => RatingEntity, (ratingEntity) => ratingEntity.film)
  ratings: RatingEntity[];
}
