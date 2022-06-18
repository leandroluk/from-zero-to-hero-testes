FROM node
WORKDIR /app
COPY ./src ./src 
COPY ./sequelize ./sequelize
COPY .sequelizerc . 
COPY package*.json .
ENV \
  NODE_ENV='production' \
  APP_PORT=3000 \
  MYSQL_URI='mysql://root:root@localhost:3306/db' 
RUN npm ci --silent --no-warnings
CMD ["node", "src"]
