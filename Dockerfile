FROM node

WORKDIR /var/www

COPY package*.json ./

COPY . .

RUN npm install

RUN cd node_modules/bcrypt && node-pre-gyp install --fallback-to-build

RUN sed -i 's/\r$//' docker/entrypoint.sh

RUN chmod +x docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./docker/entrypoint.sh"]