# Version node
FROM node:latest

#Creacion del directorio de trabajo
WORKDIR /backend

#Copiar las dependencias y archivos
COPY . .

#Comando para instalar dependencias
RUN npm install

#Puerto a exponer
EXPOSE 5000

CMD ["npm", "start"]