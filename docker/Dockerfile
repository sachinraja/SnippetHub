FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY src/prisma/schema.prisma src/prisma/
RUN npm run prisma:gen

COPY . ./

RUN npm run graphql:gen


EXPOSE 3000
