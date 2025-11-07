import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { UsersEntity } from "src/modules/users/entities/users.entity";

export const Authorize = createParamDecorator(
  (data: keyof UsersEntity, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user;

    return data ? user![data] : user
  }
)