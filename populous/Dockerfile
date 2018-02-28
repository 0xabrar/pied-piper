# build context is parent directory
FROM node:alpine
EXPOSE 8080

COPY populous/package*.json ./ 
RUN npm install

COPY populous .
COPY common common/

CMD ["npm", "start", "-s"]
