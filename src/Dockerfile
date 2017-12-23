FROM node:6.12-alpine

RUN mkdir server
WORKDIR /server

COPY package.json .

## Don't intall devDependencies
RUN npm install --production

EXPOSE 5000

# Bundle app source
COPY . .

CMD npm run serve
