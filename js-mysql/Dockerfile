FROM node
WORKDIR /app
COPY . .
ENV \
  APP_PORT=3000 \
  MYSQL_URI='mysql://root:root@localhost:3306/db'
RUN npm ci --silent
CMD npm start
