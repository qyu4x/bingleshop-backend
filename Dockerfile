FROM node

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

COPY docker/entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["docker/entrypoint.sh"]