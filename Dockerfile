FROM node:latest

WORKDIR /EriosPainAPI

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
