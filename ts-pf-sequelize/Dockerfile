FROM node AS builder
WORKDIR /app
COPY . .
RUN npm i && npm run build
ENV \
  NODE_ENV='production' \
  APP_PORT=3000 \
  MYSQL_URI='mysql://root:root@localhost:3306/db'
CMD ["node", "dist/src"]
