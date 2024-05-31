ARG NODE_VERSION=20.10.0

# install dependencies
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory
ENV APP_HOME /var/www/sysadmin-app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY . .
COPY package.json tsconfig.json tsconfig.build.json ./
RUN npm install -g npm@10.8.1
RUN npm install

RUN adduser --disabled-password nestjs
RUN chown -R nestjs:nestjs $APP_HOME
USER nestjs

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]