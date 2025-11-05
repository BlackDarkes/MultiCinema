import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { ForumModule } from '../forum/forum.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { RatingModule } from '../rating/rating.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
    ]),
    ForumModule,
    FavoritesModule,
    RatingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
