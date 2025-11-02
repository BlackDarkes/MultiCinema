import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeormConfig } from "./config/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from './modules/users/users.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { SubscribeModule } from './modules/subscribe/subscribe.module';
import { ForumModule } from './modules/forum/forum.module';
import { FilmsModule } from './modules/films/films.module';
import { GenreModule } from './modules/genre/genre.module';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getTypeormConfig,
			inject: [ConfigService],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public")
		}),
		UsersModule,
		FavoritesModule,
		SubscribeModule,
		ForumModule,
		FilmsModule,
		GenreModule,
		NewsModule,
		AuthModule,
	],
})
export class AppModule {}
