FROM node:alpine

WORKDIR /frontend

COPY . .

#RUN npm ci --only=production    para hacerlo mas liviano
RUN npm install 

# RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]