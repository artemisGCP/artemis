#Build react client
FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

#Install dependencies

RUN npm install --silent

#Copy files to api foler
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]