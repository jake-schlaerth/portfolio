FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y git
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

RUN mkdir -p repos

COPY . .

RUN pnpm install
RUN pnpm prisma generate

EXPOSE 3000

# CMD ["tail", "-f", "/dev/null"]
CMD ["pnpm", "run", "start:dev"]