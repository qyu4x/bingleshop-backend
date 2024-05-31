FROM node

WORKDIR /app

COPY . .

RUN npm i

RUN npm run migrate

RUN npm run seed

EXPOSE 8080

ENTRYPOINT ["npm", "run", "prod"]