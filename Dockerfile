FROM node

WORKDIR /var/www

COPY package*.json ./

COPY . .

RUN npm install

RUN sed -i 's/\r$//' docker/entrypoint.sh

RUN chmod +x docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./docker/entrypoint.sh"]