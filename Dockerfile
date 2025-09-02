FROM node:20.13.1-slim

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY . /app

RUN pnpm install

ENV DB_NAME=$DB_NAME
ENV DB_PASS=$DB_PASS
ENV DB_USER=$DB_USER

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]