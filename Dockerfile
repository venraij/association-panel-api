
FROM node:16.13.1 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build
ENV PORT 80
EXPOSE 80
CMD [ "node", "dist/index.js" ]