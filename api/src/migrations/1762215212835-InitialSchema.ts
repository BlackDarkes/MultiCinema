import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1762215212835 implements MigrationInterface {
    name = 'InitialSchema1762215212835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "country" character varying(128) NOT NULL, "filmId" uuid, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "genre" character varying(128) NOT NULL, "filmId" uuid, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "film_id" uuid NOT NULL, "score" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usersId" uuid, "filmId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying(255) NOT NULL, "name" character varying(128) NOT NULL, "type" character varying(255) NOT NULL, "time" character varying(30) NOT NULL, "country" integer NOT NULL, "director" character varying(80) NOT NULL, "genres" integer array NOT NULL, "year" character varying(9) NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "film_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "usersId" uuid, "filmId" uuid, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "usersId" uuid, CONSTRAINT "PK_ffd925a9b1fa44ab1ce26c9821c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "city" character varying(255), "description" text, "avatar" character varying(255), "social" character varying(255) array, "subscribe" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying(255) NOT NULL, "title" character varying(128) NOT NULL, "body" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_9948e11251bb4c1f43619bc46ba" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "FK_1bbd84095397703df970479df0d" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_588f0e7159a3cd99b8a7333aa2b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_297e170a2c8fd81f0de89064773" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_f623167aedfa24247441281b166" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_942104b41849a258ab1bb068bfd" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum" ADD CONSTRAINT "FK_1a0cd876c7e65e278632eb94ce1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum" DROP CONSTRAINT "FK_1a0cd876c7e65e278632eb94ce1"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_942104b41849a258ab1bb068bfd"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_f623167aedfa24247441281b166"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_297e170a2c8fd81f0de89064773"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_588f0e7159a3cd99b8a7333aa2b"`);
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "FK_1bbd84095397703df970479df0d"`);
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_9948e11251bb4c1f43619bc46ba"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "forum"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
