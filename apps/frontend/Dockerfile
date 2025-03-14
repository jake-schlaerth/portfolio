# Use a lightweight Node.js image
FROM node:23

# RUN useradd -m myuser
# USER myuser
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
