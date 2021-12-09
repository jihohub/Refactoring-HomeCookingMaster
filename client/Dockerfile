FROM node:14.17.1 as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

FROM nginx:latest

COPY build /usr/share/nginx/html

COPY /proxy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

