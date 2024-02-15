FROM node:20

WORKDIR /usr/src/app

COPY . .
RUN npm install

WORKDIR /usr/src/app/apps/analytics-writer

EXPOSE 3002

CMD ["npx", "nodemon"]
