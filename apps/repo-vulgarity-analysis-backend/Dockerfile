FROM node:22

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY . .

RUN pnpm install
RUN pnpm prisma generate

EXPOSE 3000

# CMD ["tail", "-f", "/dev/null"]
CMD ["pnpm", "run", "start:dev"]