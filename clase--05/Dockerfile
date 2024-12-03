FROM node
#Definimos una imagen base: NODE.

WORKDIR /app
#Acá estamos creando una carpeta interna donde guardar nuestro proyecto. 

COPY package.json .
#aca estamos copiando el package.json a mi nueva carpeta. 

RUN npm install 
#Tiene que ejecutarse el npm install en la nueva carpeta. 

COPY . . 
#Esta cosa que hicimos copia todo el codigo de mi aplicacion. 

EXPOSE 8080
#Le decimos que puerto vamos a escuchar. 

CMD [ "npm", "start" ]
#Tiene que ejecutar el "npm start" para que funcione, no se olviden de configurar el script


