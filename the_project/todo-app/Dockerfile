FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
