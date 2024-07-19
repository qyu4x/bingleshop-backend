FROM node

WORKDIR /var/www

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install node-gyp -g \

RUN npm install bcrypt -g

RUN  npm install bcrypt --save

RUN sed -i 's/\r$//' docker/entrypoint.sh

RUN chmod +x docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./docker/entrypoint.sh"]