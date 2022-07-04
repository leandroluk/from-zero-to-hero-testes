FROM node
WORKDIR /app
COPY ./src ./src 
COPY package*.json .
ENV \
  NODE_ENV='production' \
  APP_PORT=3000 \
  MYSQL_URI='mongodb://localhost:27017/db' 
RUN npm ci --silent --no-warnings
CMD ["node", "src"]
