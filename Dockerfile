FROM node:21.7.2

WORKDIR /app

COPY package*.json index.js ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]