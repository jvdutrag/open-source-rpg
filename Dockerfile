FROM node:alpine

WORKDIR /rpg
COPY package.json .
RUN npm install
COPY . .
CMD npm i && npm start