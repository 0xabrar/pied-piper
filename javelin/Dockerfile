# build context is parent directory
FROM node:alpine
EXPOSE 8080

COPY javelin/package*.json ./ 
RUN npm install

COPY javelin .
COPY common common/

CMD ["npm", "start", "-s"]
