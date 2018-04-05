# build context is parent directory
FROM node:alpine
EXPOSE 3000 

COPY scythe/package*.json ./ 
RUN npm install

COPY scythe .
COPY src/common src/common/

CMD ["npm", "start", "-s"]
