FROM node:20.13.1-slim

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY ./ /app

RUN pnpm install --production

EXPOSE 3000

CMD [ "pnpm", "run", "start" ]