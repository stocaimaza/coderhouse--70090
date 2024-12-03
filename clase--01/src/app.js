//MOCK: es una imitación de un dato real. Es una simulación que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas rapidas. 
//Entonces yo puedo crear usuarios, productos, imagenes, etc. 

//FAKER-JS 

//npm i @faker-js/faker

import express from "express";
const app = express(); 
const PUERTO = 8080; 
import usuariosRouter from "./routes/usuarios.router.js"; 

app.use("/api/users", usuariosRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto 8080`);
})