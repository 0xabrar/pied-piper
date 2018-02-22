FROM node:alpine
MAINTAINER Abrar Hussain <abrar.a.hussain@gmail.com>

EXPOSE 8080 

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start", "-s"]
