FROM node:20

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3001

WORKDIR /usr/src/app/apps/analytics-streamer

CMD ["npx", "nodemon"]
