FROM node:16-alpine
WORKDIR /app
RUN npm init -y && npm install express
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
