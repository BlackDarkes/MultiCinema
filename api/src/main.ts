import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());

	app.enableCors({
		origin: [
			"http://localhost:3000",
			`http://${configService.getOrThrow<string>("DB_HOST")}:${configService.getOrThrow<string>("DB_PORT")}`,
		],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Context-Type", "Authorizations", "Set-Cookie"],
		exposedHeaders: ["Set-Cookie"],
		credentials: true
	})

	await app.listen(configService.getOrThrow<number>("PORT") ?? 8000);
}
bootstrap();
