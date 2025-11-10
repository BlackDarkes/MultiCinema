FROM node:25-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app

COPY package*.json ./

RUN pnpm install 

COPY . .

RUN pnpm build

EXPOSE 8000

CMD [ "pnpm", "start" ]