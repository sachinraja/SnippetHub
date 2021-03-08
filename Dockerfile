FROM node:15.11-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

# install only production modules and set aside
RUN npm ci --production

# generate @prisma/client - is a production package that will be copied
COPY src/prisma/schema.prisma ./src/prisma/
RUN npx prisma generate

# install all other dependencies (devDependencies)
RUN npm i ts-node

# set aside production packages
#RUN cp -R node_modules /tmp/prod_node_modules/

COPY . .

#FROM node:15.0-alpine AS release

#WORKDIR /user/src/app

# copy items more likely to stay the same for cache
#COPY --from=builder /user/src/app/package*.json ./

# copy production modules
#COPY --from=builder /tmp/prod_node_modules ./node_modules

# copy only necessary extraneous directories
#COPY --from=builder /user/src/app/public ./public
#COPY --from=builder /user/src/app/prisma ./src/prisma

# copy build
#COPY --from=builder /user/src/app/.next ./.next

EXPOSE 3000