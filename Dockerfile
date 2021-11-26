FROM node:lts-bullseye-slim

WORKDIR /rpg
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN node_modules/.bin/next build 
CMD node_modules/.bin/next start