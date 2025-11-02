import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeormConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    host: configService.getOrThrow<string>("DB_HOST"),
    port: configService.getOrThrow<number>("DB_PORT"),
    username: configService.getOrThrow<string>("DB_USER"),
    password: configService.getOrThrow<string>("DB_PASSWORD"),
    database: configService.getOrThrow<string>("DB_NAME"),
    entities: ["dist/modules/**/entities/*.entity.{js,ts}"],
    migrations: ["dist/migrations/*.{js,ts}"],
    synchronize: false,
    logging: true,
  }
}