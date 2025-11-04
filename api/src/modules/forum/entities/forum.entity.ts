import { UsersEntity } from "../../users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("forum")
export class ForumEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.forums)
  users: UsersEntity;
}