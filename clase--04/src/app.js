/** CLASE 4 LOGGERS Y TESTING DE PERFORMANCE**/

//Temas de hoy: 
//1) Que son los loggers
//2) Winston
//3) Test de Carga Artillery
//4) Modelo de Performance con Artillery

import express from "express"; 
const app = express(); 
const PUERTO = 8080; 
import addLogger from "./utils/flogger.js";

//Middleware
app.use(addLogger); 

//Rutas

app.get("/", (req, res) => {
    res.send("Olis!"); 
})

//Testeamos el warning: 
app.get("/warning", (req, res) => {
    req.logger.warn("¡Cuidado! Hombre radiactivo!"); 
    res.send("Prueba de Warning"); 
})

//Ruta para probar todooo:

app.get("/loggertest", (req, res) => {
    req.logger.error("Error fatal, nos vamos a re morir todos"); 
    req.logger.debug("Mensaje de debug"); 
    req.logger.info("Mensaje de info");
    req.logger.warning("Mensaje de Warning"); 

    res.send("Test de logs");
})

//RUTAS TEST: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0; 

    for (let i = 0; i < 1000000; i++ ){
        suma += i; 
    }

    res.send({suma}); 
})


app.get("/operacioncompleja", (req, res) => {
    let suma = 0; 

    for (let i = 0; i < 5e8; i++ ){
        suma += i; 
    }

    res.send({suma}); 
})





app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})

//Artillery: 
//Es una herramienta que me permite simular multiples peticiones de informacion a mi servidor. con la idea de testear su funcioamiento. 

//Se recomienda instalar de forma global: npm i artillery -g

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json
