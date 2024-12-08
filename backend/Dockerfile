FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
EXPOSE 5500
CMD ["/wait-for-it.sh", "database:3306", "--", "npm", "start"]

