import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeormConfig } from "./config/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

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
		})
	],
})
export class AppModule {}
