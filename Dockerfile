FROM node:20

WORKDIR /jewellery-shopping-app-v1.1
COPY ./package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]


#Command to deploy (Must be same work directory): docker build -t react-app .