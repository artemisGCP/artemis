#Build react client
FROM node as builder

#Working Directory
WORKDIR /usr/src/app

COPY package*.json ./

#Install dependencies

RUN npm install --silent

#Copy files to ui foler
COPY . .

RUN npm run-script build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#Only copy build from previous stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html



EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

