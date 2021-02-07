FROM node:14-alpine

WORKDIR /user/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --quiet

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]