/** DOCKER Y KUBERNETES **/

import express from "express";
const app = express(); 
const PUERTO = 8080; 

app.get("/", (req, res) => {
    res.send("Hola Mundillo!"); 
})

app.listen(PUERTO, () => console.log("Escuchando en el 8080 fm hit")); 