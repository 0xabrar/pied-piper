# build context is parent directory
FROM node:alpine
EXPOSE 8080

COPY trident/package*.json ./ 
RUN npm install

COPY trident .
COPY common common/

CMD ["npm", "start", "-s"]
