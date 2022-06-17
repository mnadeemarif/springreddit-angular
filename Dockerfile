FROM node:16.15.1-alpine3.15 as node

WORKDIR /app

COPY . .

COPY package.json .
COPY package-lock.json .

EXPOSE 4200

RUN npm config rm proxy
RUN npm config rm https-proxy

RUN npm install --legacy-peer-deps

CMD [ "./node_modules/.bin/ng" , "build" , "--prod"]


FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/angular-reddit /usr/share/nginx/html
