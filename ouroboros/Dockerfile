# build context is parent directory
FROM node:alpine
EXPOSE 8080

COPY ouroboros/package*.json ./ 
RUN npm install

COPY ouroboros .
COPY common common/

CMD ["npm", "start", "-s"]
